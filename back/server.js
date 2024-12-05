const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
});

db.connect(err => {
    if (err) {
        console.error("Database Connection Failed:", err);
        return;
    }
    console.log("Connected to Database");
});

app.post('/signup', (req, res) => {
    console.log("Request Body:", req.body);
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json("Database Error");
        }
        return res.status(200).json("User Registered Successfully");
    });
});

app.post('/login', (req, res) => {
    console.log("Request Body:", req.body);
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json("Database Error");
        }
        console.log("Query Result:", data);
        if (data.length > 0) {
            return res.status(200).json("Success");
        } else {
            return res.status(404).json("Fail");
        }
    });
});

app.listen(8082, () => {
    console.log("Server listening on port 8082");
});
