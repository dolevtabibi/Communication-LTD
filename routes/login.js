const express = require('express');
const router = express.Router();
const db = require("../db-config");


router.get('/', function (req, res) {
    res.status(200).render('login.ejs')
});

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Check if the email exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.log("database error:", error);
            res.render('login.ejs', { message: 'An error occurred while querying the database. Please try again later.' });
        } else if (results.length === 0) {
            console.log("user not found");
            res.render('login.ejs', { message: 'User not found. Please check your email or password and try again.' });
        } else {
            // If the email exists, validate the password
            const user = results[0];
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log("password validation error:", err);
                    res.render('login.ejs', { message: 'An error occurred while validating the password. Please try again later.' });
                } else if (!result) {
                    console.log("incorrect password");
                    res.render('login.ejs', { message: 'Incorrect password. Please try again.' });
                } else {
                    console.log("login successful");
                    const fullName = user.fullname;
                    req.session.fullName = fullName; // Set the full name in the session
                    console.log("cookie name is: ", req.session.fullName)
                    res.redirect('/home');
                }
            });
        }
    });
});

module.exports = router;