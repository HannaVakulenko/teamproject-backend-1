const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        review: {
            type: String,
            maxlength: 300,
            required: [true, "Leave your feedback"],
        },
        rating: {
            type: Number,
            required: [true, "Set rating"],
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        name: String,

        avatarURL: String,
    },
    { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("reviews", schema);
