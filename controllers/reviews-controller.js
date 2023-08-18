const { Reviews, User } = require("../models/index");
const { HttpError, ctrlWrapper } = require("../helpers");

// Get all reviews

const getAllReviews = async (req, res) => {
    const result = await Reviews.find().sort({ updatedAt: -1 });
    if (req.query.page === undefined) {
        return res.status(200).json({ reviews: result, total: result.length });
    }
    return res.status(200).json({ reviews: result.slice((req.query.page - 1) * req.query.limit, req.query.page * req.query.limit), total: result.length });
};

// Post owner's review

const setReview = async (req, res) => {
    const review = {
        review: req.body.review,
        rating: req.body.rating,
        owner: req.user.id,
        name: req.user.name,
        avatarURL: req.user.avatarURL,
    };
    const userReview = await User.findOne({ _id: req.user.id });
    if (userReview.isReview) {
        throw HttpError(400, "You already have review");
    }
    const result = await Reviews.create(review);
    const user = await User.findOneAndUpdate({ _id: req.user.id }, { isReview: true }, { new: true });
    if (user === null) {
        throw HttpError(404, "User not found");
    }
    return res.status(201).json({ reviews: [{ review: result.review, rating: result.rating }] });
};

// Update owner's review

const changeReview = async (req, res) => {
    const review = {
        review: req.body.review,
        rating: req.body.rating,
    };

    const result = await Reviews.findOneAndUpdate({ owner: req.user.id }, review, { new: true });
    if (result === null) {
        throw HttpError(404, "Not found");
    }

    return res.status(200).json({ reviews: [{ review: result.review, rating: result.rating }] });
};

// Delete owner's review

const deleteReview = async (req, res) => {
    const result = await Reviews.findOneAndDelete({ owner: req.user.id });
    if (result === null) {
        throw HttpError(404, "Not found");
    }
    const user = await User.findOneAndUpdate({ _id: req.user.id }, { isReview: false }, { new: true });
    if (user === null) {
        throw HttpError(404, "User not found");
    }
    return res.status(200).json({ message: "review deleted" });
};

// Get owner's review

const getReview = async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user.isReview) {
        return res.status(200).json({ reviews: [] });
    }
    updateAvatarReview(req, res);
    const result = await Reviews.findOne({ owner: req.user.id });
    if (result === null) {
        throw HttpError(404, "Not found");
    }
    return res.status(200).json({ reviews: [{ review: result.review, rating: result.rating }] });
};

// Update all avatars in all reviews

const updateAvatarReview = async (req, res) => {
    try {
        const review = {
            avatarURL: req.user.avatarURL,
        };

        const result = await Reviews.findOneAndUpdate({ owner: req.user.id }, review, { new: true });
        if (result === null) {
            return res.status(200).end();
        }

        return res.status(200).end();
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    getAllReviews: ctrlWrapper(getAllReviews),
    setReview: ctrlWrapper(setReview),
    changeReview: ctrlWrapper(changeReview),
    deleteReview: ctrlWrapper(deleteReview),
    getReview: ctrlWrapper(getReview),
};
