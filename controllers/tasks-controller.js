const { Tasks } = require("../models/index");
const { HttpError, ctrlWrapper } = require("../helpers");

// Get tasks for month

const getTasks = async (req, res) => {
    const results = await Tasks.find({ owner: req.user.id });
    const monthStart = new Date(req.query.monthStart);
    const monthEnd = new Date(req.query.monthEnd);
    const result = results.filter((result) => {
        return monthStart.getTime() <= result.date.getTime() && result.date.getTime() <= monthEnd.getTime();
    });

    res.status(200).json({ tasks: result, avatarURL: req.user.avatarURL });
};

// Post task

const setTask = async (req, res) => {
    const task = {
        title: req.body.title,
        priority: req.body.priority,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        owner: req.user.id,
    };

    const result = await Tasks.create(task);
    return res.status(201).json(result);
};

// Update task by ID

const changeTask = async (req, res) => {
    const task = {
        title: req.body.title,
        priority: req.body.priority,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        owner: req.user.id,
    };

    const result = await Tasks.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, task, { new: true });
    if (result === null) {
        throw HttpError(404, "Not found");
    }

    return res.status(200).json(result);
};

// Delete task by ID

const deleteTask = async (req, res) => {
    const result = await Tasks.findOneAndDelete({ _id: req.params.id }, { owner: req.user.id });
    if (result === null) {
        throw HttpError(404, "Not found");
    }

    return res.status(200).json({ message: "task deleted" });
};

module.exports = {
    getTasks: ctrlWrapper(getTasks),
    setTask: ctrlWrapper(setTask),
    changeTask: ctrlWrapper(changeTask),
    deleteTask: ctrlWrapper(deleteTask),
};
