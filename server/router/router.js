const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ status: "OKAY" });
});

router.post("/", (req, res) => {
    res.json({ status: "OKAY" });
});

module.exports = router;
