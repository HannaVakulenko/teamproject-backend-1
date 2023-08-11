const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 250,
            required: [true, "Set the title"],
        },
        priority: {
            type: String,
            enum: ["low", "medium", "pro"],
            required: [true],
        },
        category: {
            type: String,
            enum: ["to-do", "in-progress", "done"],
            required: [true],
        },
        start: { type: String },
        end: { type: String },
        date: {
            type: Date,
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },

        avatarURL: String,
    },
    { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("tasks", schema);
