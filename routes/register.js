const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../db-config");
const badPasswords = ["mypassword", "password1234", "1234567890", "0987654321"];

router.get('/', function (req, res) {
    res.status(200).render('register', { errorMessage: null, errorMessage1: null });
});

// Create a new user with hashed password
router.post('/', async (req, res) => {
    // Get the user's input from the registration form
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    // Check if the password is too weak
    if (badPasswords.includes(password)) {
        return res.status(400).render('register.ejs', { errorMessage: null, errorMessage1: 'Password is too weak!' });
    }

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).render('register.ejs', { errorMessage: null, errorMessage1: 'Passwords do not match!' });
    }

    // Check if the email is already registered
    db.query('SELECT id FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.log("database error:", error);
            res.render('register.ejs', { errorMessage: 'An error occurred while checking if the email is already registered. Please try again later.', errorMessage1: null, });
        } else if (results.length > 0) {
            console.log("user already exists");
            res.render('register.ejs', { errorMessage: 'This email is already registered. Please try a different email.', errorMessage1: null, });
        } else {
            // Hash the password using bcrypt
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    console.log("password hashing error:", err);
                    res.render('register.ejs', console.log('An error occurred while hashing the password. Please try again later.'))
                } else {
                    const fullname = `${firstname} ${lastname}`;
                    // Insert the user with hashed password into the database
                    db.query('INSERT INTO users (email, password, fullname) VALUES (?, ?, ?)', [email, hash, fullname], function (error, results, fields) {
                        if (error) {
                            console.log("database error:", error);
                            res.render('register.ejs', { errorMessage: 'An error occurred while creating the user. Please try again later.', errorMessage1: null, });
                        } else {
                            // Handle successful registration
                            var message = "Registration successful!";
                            console.log("user created successfully");
                            res.status(200).redirect('/success');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
