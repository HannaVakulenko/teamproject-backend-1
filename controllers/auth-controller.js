const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "User with this email address already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  // res.status(201).json({
  //   email: newUser.email,
  //   name: newUser.name,
  // });

  login(req, res);
};

const getCurrent = async (req, res) => {
  const { email, name, isReview } = req.user;

  res.json({ email, name, isReview });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { name, email, password, isReview } = req.body;
  const result = await User.findByIdAndUpdate(
    id,
    { name, email, password, isReview },
    { new: true }
  );
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
