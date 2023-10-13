const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

const { HttpError, ctrlWrapper } = require("../helpers");

const { JWT_SECRET } = process.env;

// Login controller

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM NewTable WHERE email = ?",
    [email],
    (error, results, fields) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);

        return;
      }

      if (results.length > 0) {
        const user = results[0];
        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          throw HttpError(401, "Email or password invalid");
        }

        const payload = {
          id: user.id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        res.json({
          email,
          token,
        });
        console.log("Данные пользователя:", user.password);
      } else {
        console.log("Пользователь не найден");
      }
    }
  );
};

// Register controller

const register = async (req, res) => {
  const { email, password } = req.body;
  const sql = `INSERT INTO NewTable (email, password) VALUES ('${email}', '${password}')`;
  try {
    const result = await db.query(sql);
    res.json({
      email,
      password,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Getting the current token

const getCurrent = async (req, res) => {
  const { token } = req.user;

  res.json({
    token,
  });
};

// Getting user data

const getUser = async (req, res) => {
  const {
    _id,
    name,
    email,
    password,
    isReview,
    avatarURL,
    skype,
    phone,
    birthday,
  } = req.user;

  res.json({
    _id,
    name,
    email,
    password,
    isReview,
    avatarURL,
    skype,
    phone,
    birthday,
  });
};

// Logout controller

const logout = async (req, res) => {
  // const { _id } = req.user;

  res.json({ message: "Logout success" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  getUser: ctrlWrapper(getUser),
};
