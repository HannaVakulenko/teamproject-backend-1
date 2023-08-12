const { Reviews } = require("../models/index");
const { User } = require("../models/user");

const getAllReviews = async (req, res, next) => {
    try {
        const result = await Reviews.find();
        const sortResult = result.sort(function (a, b) {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
        });
        if (req.query.page === undefined) {
            return res.status(200).json({ reviews: sortResult, total: sortResult.length });
        }
        return res.status(200).json({ reviews: sortResult.slice((req.query.page - 1) * req.query.limit, req.query.page * req.query.limit), total: sortResult.length });
    } catch (error) {
        return next(error);
    }
};

const setReview = async (req, res) => {
    try {
        const review = {
            review: req.body.review,
            rating: req.body.rating,
            owner: req.user.id,
            name: req.user.name,
            avatarURL: req.user.avatarURL,
        };
        const userReview = await User.findOne({ _id: req.user.id });
        if (userReview.isReview) {
            return res.status(400).json({ message: "You already have review" });
        }
        const result = await Reviews.create(review);
        const user = await User.findOneAndUpdate({ _id: req.user.id }, { isReview: true }, { new: true });
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(201).json({
            review: result.review,
            rating: result.rating,
            name: result.name,
        });
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

const changeReview = async (req, res, next) => {
    try {
        const review = {
            review: req.body.review,
            rating: req.body.rating,
        };

        const result = await Reviews.findOneAndUpdate({ owner: req.user.id }, review, { new: true });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.status(200).json({
            review: result.review,
            rating: result.rating,
            name: result.name,
            avatarURL: req.user.avatarURL,
        });
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const result = await Reviews.findOneAndDelete({ owner: req.user.id });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }
        const user = await User.findOneAndUpdate({ _id: req.user.id }, { isReview: false }, { new: true });
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "review deleted" });
    } catch (error) {
        return next(error);
    }
};

const getReview = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user.isReview) {
            return res.status(200).json([]);
        }
        updateAvatarReview(req, res);
        const result = await Reviews.findOne({ owner: req.user.id });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.status(200).json({
            review: result.review,
            rating: result.rating,
            name: result.name,
            avatarURL: result.avatarURL,
        });
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

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
    getAllReviews,
    setReview,
    changeReview,
    deleteReview,
    getReview,
    updateAvatarReview,
};
