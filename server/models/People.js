const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamp: true,
    }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
