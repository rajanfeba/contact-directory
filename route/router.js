const express = require("express");
const apis = express.Router();
apis.use((req, res, next) => {
    if (!req.app.locals.db) {
        console.error("Database is not initialized!");
        return res.status(500).json({ error: "Database connection error" });
    }
    req.db = req.app.locals.db;
    next();
});
apis.use("/contacts", require("../controller/contact"));

module.exports = apis;
