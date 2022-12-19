const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
// Static routes
app.use(express.static(path.join(__dirname, "public")));

const Router = require('./router/router');

//database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection successful!");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api", Router);

app.listen(process.env.PORT, () => {
    console.log("Server running @ " + process.env.PORT);
});
