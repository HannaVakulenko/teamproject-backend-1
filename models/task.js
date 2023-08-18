const mongoose = require("mongoose");
const { CATEGORY, PRIORITY } = require("../constants/index");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 250,
            required: [true, "Set the title"],
        },
        priority: {
            type: String,
            enum: PRIORITY,
            required: [true],
        },
        category: {
            type: String,
            enum: CATEGORY,
            required: [true],
        },
        start: {
            type: String,
            required: true,
            validate: {
                validator: function (start) {
                    const [hoursStart, minutesStart] = start.split(":").map(Number);
                    const hoursInMillisecondsStart = hoursStart * 60 * 60 * 1000;
                    const minutesInMillisecondsStart = minutesStart * 60 * 1000;
                    const startMS = hoursInMillisecondsStart + minutesInMillisecondsStart;
                    const [hoursEnd, minutesEnd] = this.end.split(":").map(Number);
                    const hoursInMillisecondEnd = hoursEnd * 60 * 60 * 1000;
                    const minutesInMillisecondsEnd = minutesEnd * 60 * 1000;
                    const endMS = hoursInMillisecondEnd + minutesInMillisecondsEnd;

                    return startMS < endMS;
                },
                message: (props) => `The start value (${props.value}) should be less than the end value`,
            },
        },
        end: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: [true],
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
    },
    { versionKey: false }
);



module.exports = mongoose.model("tasks", schema);
