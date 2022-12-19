const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
    {
        project_name: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        long: {
            type: Number,
            required: true,
        },
        data: {
            type: String,
            require: true,
        },
    },
    {
        timestamp: true,
    }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
