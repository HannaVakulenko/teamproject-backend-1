const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { EMAILREGEXP, MOBILEREGEXP } = require("../constants/index");

const { handleMongooseError } = require("../helpers");

// Schema for mongoose, what should be logged on successful user registration

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, match: EMAILREGEXP, unique: true, required: true },
        password: { type: String, minlength: 7, required: true },
        token: { type: String, default: "" },
        isReview: { type: Boolean, default: false },
        avatarURL: { type: String, default: "https://res.cloudinary.com/dici0468p/image/upload/v1692125232/64bcf8d8baf97262d83a50d8-avatarka_o1itua.jpg" },
        skype: { type: String, default: "" },
        phone: { type: String, default: "" },
        birthday: { type: Date, default: null },
        theme: { type: String, default: "light" },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

// Scheme for registration

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(EMAILREGEXP).required(),
    password: Joi.string().min(7).required(),
});

// Scheme for update user data

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(EMAILREGEXP),
    password: Joi.string().min(7),
    phone: Joi.string().pattern(MOBILEREGEXP),
    birthday: Joi.date(),
    theme: Joi.string(),
    avatarURL: Joi.string(),
    skype: Joi.string(),
});

// Scheme for authorization

const loginSchema = Joi.object({
    email: Joi.string().pattern(EMAILREGEXP).required(),
    password: Joi.string().min(7).required(),
});

// Creating schemas
const schemas = { registerSchema, loginSchema, updateSchema };

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};
