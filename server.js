const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Earge1122@qw", // Put your actual password here
    database: "test"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// Root route: Registration page [cite: 121]
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Registration logic [cite: 137, 139]
app.post('/register', (req, res) => {
    const { firstName, surname, email, password } = req.body;
    const sql = "INSERT INTO users (first_name, surname, email, password) VALUES (?, ?, ?, ?)";
    conn.query(sql, [firstName, surname, email, password], (err, result) => {
        if (err) throw err;
        res.sendFile(path.join(__dirname, 'public', 'success.html'));
    });
});

// Task 1: Login Routes [cite: 323, 330]
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?"; // Task 1.5.c Missing Query [cite: 332]
    conn.query(sql, [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
        } else {
            res.send('<h2>Invalid Email or Password</h2><a href="/login">Try Again</a>');
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});