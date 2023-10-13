const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth-controller");
const {
  authenticate,
  isUserInTableRegister,
  isUserInTableLogin,
} = require("../../middlewares");

// SignUp
router.post("/register", isUserInTableRegister, ctrl.register);

// SignIn
router.post("/login", isUserInTableLogin, ctrl.login);

// isTokenActive
router.get("/current", authenticate, ctrl.getCurrent);

// Logout
router.post("/logout", authenticate, ctrl.logout);

router.get("/account", authenticate, ctrl.getUser);

module.exports = router;
