const express = require("express");
const path = require("path");
const router = express.Router();

// Middleware to access database from app.js
router.use((req, res, next) => {
    if (!req.db) {
        console.error("Database is missing in request object!");
        return res.status(500).json({ error: "Database connection is missing" });
    }
    next();
});


// Serve the frontend
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Get all contacts
router.get("/list", (req, res) => {
    req.db.all("SELECT * FROM contacts", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Create a new contact
router.post("/new-contact", (req, res) => {
    const { name, address, phone } = req.body;
    req.db.run(
        "INSERT INTO contacts (name, address, phone) VALUES (?, ?, ?)",
        [name, address, phone],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, name, address, phone });
            }
        }
    );
});

// Update a contact
router.put("/update/:id", (req, res) => {
    const { name, address, phone } = req.body;
    const { id } = req.params;
    req.db.run(
        "UPDATE contacts SET name = ?, address = ?, phone = ? WHERE id = ?",
        [name, address, phone, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Contact updated successfully" });
            }
        }
    );
});

// Delete a contact
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    req.db.run("DELETE FROM contacts WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Contact deleted successfully" });
        }
    });
});

module.exports = router;
