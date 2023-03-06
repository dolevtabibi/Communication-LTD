const express = require('express');
const router = express.Router();
const db = require("../db-config");
const badPasswords = ["mypassword", "password1234", "1234567890", "0987654321"];

router.get('/', function (req, res) {
    res.render('register', { error: null });
});

router.post('/', function (req, res) {
    // Get the user's input from the registration form
    const { fullname, email, password, confirmPassword } = req.body;

    console.log(req.body);

    // Check if the password is too weak
    if (badPasswords.includes(password)) {
        return res.status(400).render('register', { error: 'Password is too weak!' });
    }

    // Check if the password and confirmPassword match
    console.log("password are: ", password, confirmPassword);
    if (password !== confirmPassword) {
        return res.status(400).render('register', { error: 'Passwords do not match!' });
    }

    // Handle successful registration
    // Instead of redirecting, send a message to the page
    var message = "Registration successful!";
    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullname, email, password], (error, results, fields) => {
        if (error) throw error;
        res.status(200).redirect("../login")
    });
});

module.exports = router;

 // // Define a route that handles the login form submission
  // app.post('/login', (req, res) => {
  //   const { email, password } = req.body;
  //   const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  //   db.query(query, [email, password], (error, results, fields) => {
  //     if (error) throw error;
  //     if (results.length === 1) {
  //       res.send(`Welcome ${results[0].username}!`);
  //     } else {
  //       res.send('Invalid email or password');
  //     }
  //   });
  // });