const express = require("express");

const ctrl = require("../../controllers/auth-controller");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// Регистрация
router.post("./register", validateBody(schemas.registerSchema), ctrl.register);

// Вход
router.post("./login", validateBody(schemas.loginSchema), ctrl.register);

module.exports = router;
