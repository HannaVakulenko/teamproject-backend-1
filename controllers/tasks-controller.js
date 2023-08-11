const { Tasks } = require("../models/index");

const getTasks = async (req, res, next) => {
    try {
        // const result = await Reviews.find();
        // const sortResult = result.sort(function (a, b) {
        //     return b.updatedAt.getTime() - a.updatedAt.getTime();
        // });
        // if (req.query.page === undefined) {
        //     return res.status(200).json(sortResult);
        // }
        return res.status(200).json({ message: "ok" });
    } catch (error) {
        return next(error);
    }
};

const setTask = async (req, res) => {
    try {
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
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

const changeTask = async (req, res, next) => {
    try {
        const task = {
            title: req.body.title,
            priority: req.body.priority,
            category: req.body.category,
            start: req.body.start,
            end: req.body.end,
            date: req.body.date,
            owner: req.user.id,
        };
        console.log(task);

        const result = await Tasks.findOneAndUpdate({ _id: req.params.id , owner: req.user.id }, task, { new: true });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.status(200).json(result);
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const result = await Tasks.findOneAndDelete({ _id: req.params.id }, { owner: req.user.id });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.status(200).json({ message: "task deleted" });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getTasks,
    setTask,
    changeTask,
    deleteTask,
};
