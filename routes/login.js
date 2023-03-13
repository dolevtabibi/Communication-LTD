const express = require('express');
const router = express.Router();
const db = require("../db-config");

router.post('/', (req, res) => {
    const { email } = req.body;
    console.log("reqbody= ", req.body)
    db.query('SELECT fullname FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.log("error")
            res.redirect('/');
            console.log("error")
        } else if (results.length === 0) {
            res.redirect('/');
        } else {
            console.log("not error")
            const fullName = results[0].fullname;
            console.log(fullName); // Log the retrieved fullName to the console
            res.status(200).redirect('/')
        }
    });
});

// router.post('/', (req, res) => {
//     const fullName = req.body.fullName;
//     console.log(fullName);
//     res.status(200).redirect('/home?fullName=' + fullName);
// });
module.exports = router;