const express = require("express");
const tasks = require("../../controllers/tasks-controller");
const { authenticate } = require("../../middlewares/index");

const router = express.Router();

router.get("/", authenticate, tasks.getTasks);

router.post("/", authenticate, tasks.setTask);

router.patch("/:id", authenticate, tasks.changeTask);

router.delete("/:id", authenticate, tasks.deleteTask);

module.exports = router;