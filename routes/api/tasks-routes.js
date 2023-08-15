const express = require("express");
const tasks = require("../../controllers/tasks-controller");
const { authenticate } = require("../../middlewares/index");

const router = express.Router();

//Get all tasks
router.get("/", authenticate, tasks.getTasks);

//Post task
router.post("/", authenticate, tasks.setTask);

//Update task by ID
router.patch("/:id", authenticate, tasks.changeTask);

//Delete task by ID
router.delete("/:id", authenticate, tasks.deleteTask);

module.exports = router;