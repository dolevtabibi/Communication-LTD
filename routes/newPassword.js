const express = require('express');
const router = express.Router();
const db = require("../db-config");

router.get('/', function (req, res) {
    res.render("newPassword.ejs")
});

// router.post('/', function (req, res) {
//     // Get the user's input from the registration form
//     const { email, password, confirmPassword } = req.body;

//     console.log(req.body);

//     // Check if the password is too weak
//     if (badPasswords.includes(password)) {
//         return res.status(400).render('register', { error: 'Password is too weak!' });
//     }

//     // Check if the password and confirmPassword match
//     console.log("password are: ", password, confirmPassword);
//     if (password !== confirmPassword) {
//         return res.status(400).render('register', { error: 'Passwords do not match!' });
//     }
//     else if (password.length != 10) { return res.status(400).render('register', { error: 'Passwords is not in the right length!' }); }
//     else {
//         for (i = 0; i < password.length; i++) {
//             if (password[i] >= 'a' && password[i] <= 'z') { lowerLetter = true; }
//             if (password[i] >= 'A' && password[i] <= 'Z') { upperLetter = true; }
//             if (password[i] >= '1' && password[i] <= '9') { nums = true; }
//             if ((password[i] >= '!' && password[i] <= '/') || (password[i] >= ':' && password[i] <= '@')) { specialChar = true; }
//         }

//         if (!(upperLetter && lowerLetter && specialChar && nums)) { return res.status(400).render('register', { error: "Password must contain upper letter, lower letter, spcieal char and a number" }); }

//     }

//     // Handle successful registration
//     // Instead of redirecting, send a message to the page
//     var message = "Registration successful!";
//     const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
//     db.query(query, [fullname, email, password], (error, results, fields) => {
//         if (error) throw alert(error.message);
//         res.status(200).redirect("../login")
//     });
// });

module.exports = router;