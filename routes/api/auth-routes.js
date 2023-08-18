const express = require("express");

const ctrl = require("../../controllers/auth-controller");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/index");

const router = express.Router();

// SignUp
router.post("/register", upload.single("avatar"), validateBody(schemas.registerSchema), ctrl.register);

// SignIn
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// isTokenActive
router.get("/current", authenticate, ctrl.getCurrent);

// Logout
router.post("/logout", authenticate, ctrl.logout);

// Change user data and isTokenValid
router.patch("/account", authenticate, upload.single("avatar"), validateBody(schemas.updateSchema), ctrl.updateUser);
router.get("/account", authenticate, ctrl.getUser);

module.exports = router;
