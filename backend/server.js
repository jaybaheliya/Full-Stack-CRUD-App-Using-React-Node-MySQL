const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud"
});


// Get all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Get a single student by ID
app.get("/student/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM students WHERE ID = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(result[0]);
    });
});

// Create a new student
app.post("/create", (req, res) => {
    const { name, email, phone } = req.body;
    const sql = "INSERT INTO students (Name, EmailId, MobileNo) VALUES (?, ?, ?)";

    db.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Update a student
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const sql = "UPDATE students SET Name = ?, EmailId = ?, MobileNo = ? WHERE ID = ?";

    db.query(sql, [name, email, phone, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Delete a student
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE ID = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
