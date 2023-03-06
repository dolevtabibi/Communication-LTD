const express = require('express');
const router = express.Router();
const db = require("../db-config");

router.get('/', function (req, res) {
    res.render('login', { error: null });
});

router.post('/', function (req, res) {
    // Get the user's input from the registration form
    const {email, password} = req.body;

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

// function togglePasswordVisibility(id) {
//   const passwordInput = document.getElementById(id);
//   const passwordToggleIcon = document.getElementById('password-toggle-icon');
  
//   if (passwordInput.type === 'password') {
//       passwordInput.type = 'text';
//       passwordToggleIcon.setAttribute('name', 'eye');
//   } else {
//       passwordInput.type = 'password';
//       passwordToggleIcon.setAttribute('name', 'eye-off');
//   }
// }

  
//   document.querySelector("form").addEventListener("submit", function(event) {
//     event.preventDefault(); // prevent form submission
//     window.location.href = "system.html"; // redirect to new page
//   });



  
  // // Define a route that renders the login page
  // app.get('/login', (req, res) => {
  //   res.render('login');
  // });
  
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