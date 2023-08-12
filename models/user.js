const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Схема для монгуста, что должно записываться при успешной регистрации пользователя

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, unique: true, required: true },
    password: { type: String, minlength: 7, required: true },
    token: { type: String, default: "" },
    isReview: { type: Boolean, default: false },
    avatarURL: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

// Схема для регистрации

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

// Схема для авторизации

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

// Создаем схемы
const schemas = { registerSchema, loginSchema };

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
