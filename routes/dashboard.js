const express = require('express');
const router = express.Router();
const requireAuth = require('../auth');
const db = require("../db-config");

router.get('/', requireAuth, (req, res) => {
    if (res.locals.user) {
        console.log("if (res.locals.user)", res.locals.user)
        // user is logged in, show homepage
        const fullName = req.session.user.fullName;
        console.log("im here", fullName)
        res.render('home.ejs', { fullName, user: req.session.user });
    } else {
        // user is not logged in, redirect to login page
        res.redirect('/login');
    }
});

router.post('/addClient', function (req, res) {
    if (req.session.user) {
        console.log("if req.session.user", req.session.user)
        const { firstname, lastname, email, phoneNumber } = req.body;
        console.log("firstname", firstname)
        console.log("lastname", lastname)
        console.log("email", email)
        console.log("phoneNumber", phoneNumber)
        if (!isValidPhoneNumber(phoneNumber)) {
            console.log("Invalid phone number. Please enter a valid international phone number.")
            req.flash('error', 'Invalid phone number. Please enter a valid international phone number.');
            res.render('home.ejs', { messages: req.flash('error'), fullName: req.session.user.fullName });
        }
        // Check if the email is already registered using prepared statement
        const selectQuery = 'SELECT id FROM clients WHERE email = ?';
        db.clientDbConfig.query(selectQuery, [email], function (error, results, fields) {
            if (error) {
                console.log("database error:", error);
                req.flash('error', 'An error occurred while checking if the email is already registered. Please try again later.');
                res.render('home.ejs', { messages: req.flash('error'), fullName: req.session.user.fullName });
            } else if (results.length > 0) {
                console.log("This email is already registered. Please try a different email.");
                req.flash('error', 'This email is already registered. Please try a different email.');
                res.render('home.ejs', { messages: req.flash('error'), ...req.body, fullName: req.session.user.fullName });
            }
            else {
                const insertQuery = 'INSERT INTO clients (firstname, lastname, email, phoneNumber) VALUES (?, ?, ?, ?)';
                db.clientDbConfig.query(insertQuery, [firstname, lastname, email, phoneNumber], function (error, results, fields) {
                    if (error) {
                        console.log("database error:", error);
                        req.flash('error', 'An error occurred while adding the client. Please try again later.');
                        res.render('home.ejs', { messages: req.flash('error') }, { fullName: req.session.user.fullName });
                    } else {
                        // Handle successful client addition
                        console.log("client added successfully");
                        req.flash('success', 'Client added successfully.');
                        res.status(200).redirect('/');
                    }
                });
            }
        });
    }
})

function isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\+972\d{8,9}$/;
    return phoneNumberRegex.test(phoneNumber);
}

module.exports = router;

