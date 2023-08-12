const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

const { User } = require("../models/user");

const { HttpError, ctrlWrapper, uploadImage } = require("../helpers");

const { JWT_SECRET } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

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
    name: user.name,
    email,
    password,
    token,
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // const imagePath = req.file.path;
  // console.log(imagePath);

  // Upload the image
  // const publicId = await uploadImage(imagePath);

  if (user) {
    throw HttpError(409, "User with this email address already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // временная аватарка
  // const avatarURL = publicId || gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
  });

  // res.status(201).json({
  //   email: newUser.email,
  //   name: newUser.name,
  // });

  login(req, res);
};

const getCurrent = async (req, res) => {
  const {
    _id,
    name,
    email,
    password,
    token,
    isReview,
    avatarURL,
    skype,
    phone,
    birthday,
  } = req.user;
  console.log(req.user);

  res.json({
    _id,
    name,
    email,
    password,
    token,
    isReview,
    avatarURL,
    skype,
    phone,
    birthday,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;

//   const imagePath = req.file.path;
//   console.log(imagePath);

//   const avatarURL = await uploadImage(imagePath);

//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.json(avatarURL);
// };

const updateUser = async (req, res) => {
  const { id } = req.user;

  const imagePath = req.file.path;
  console.log(imagePath);

  const avatarURL = await uploadImage(imagePath);

  const { name, email, password, isReview, skype, phone, birthday } = req.body;
  const result = await User.findByIdAndUpdate(
    id,
    { name, email, password, isReview, skype, phone, birthday, avatarURL },
    { new: true }
  );

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
  // updateAvatar: ctrlWrapper(updateAvatar),
};
