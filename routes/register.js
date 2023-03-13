const express = require('express');
const router = express.Router();
const db = require("../db-config");
const badPasswords = ["mypassword", "password1234", "1234567890", "0987654321"];

router.post('/', function (req, res) {
    // Get the user's input from the registration form
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    // Check if the password is too weak
    if (badPasswords.includes(password)) {
        return res.status(400).render('register.ejs', { error: 'Password is too weak!' });
    }

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).render('register.ejs', { error: 'Passwords do not match!' });
    }

    // Handle successful registration
    // Instead of redirecting, send a message to the page
    let fullname = `${firstname} ${lastname}`;
    console.log("this is the full name: ", fullname);
    var message = "Registration successful!";
    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullname, email, password], (error, results, fields) => {
        if (error) throw error;
        res.status(200).render('login')
    });
});

module.exports = router;
