const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const fullName = req.session.fullName;
    if (fullName) {
        res.render('home.ejs', { fullName });
    } else {
        res.redirect('login');
    }
});

// router.post('/', function (req, res) {
//     // // get the user data from the request body
//     // var firstName = req.body.firstName;
//     // var lastName = req.body.lastName;
//     // var email = req.body.email;
//     // var phone = req.body.phone;
//     // // add the user to your database
//     // // construct the response object with the full name of the new user
//     // const fullName = `${firstName} ${lastName}`;
//     // redirect back to the same page with the response as a query parameter
//     res.status(200).render('home.ejs', { fullName })
// });

module.exports = router;
