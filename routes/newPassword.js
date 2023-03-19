const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../db-config");
const validator = require('validator');
const badPasswords = ["mypassword", "password1234", "1234567890", "0987654321"];


router.get('/', function (req, res) {
    if (!req.session) {
        return res.redirect('/'); // If the user is not logged in, redirect them to the login page
    }
    return res.status(200).render('newPassword.ejs', { errorMessage: null, errorMessage1: null })
});


function query(sql, args) {
    return new Promise((resolve, reject) => {
        db.query(sql, args, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve([rows]);
        });
    });
}

router.post('/', async function (req, res) {
    if (!req.session || !req.session.fullName) {
        return res.redirect('/login');
    }
    const userId = req.session.userid;
    const fullname = req.session.fullName;

    console.log('Full Name:', fullname);

    const { currentPassword, newPassword, newPasswordConfirm } = req.body;

    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('New Password Confirmation:', newPasswordConfirm);

    // Check if the newPassword is too weak
    if (badPasswords.includes(newPassword)) {
        return res.status(400).render('newPassword.ejs', { errorMessage: 'Password is too weak!', errorMessage1: null });
    }

    // // Validate the new password
    // if (!validator.isStrongPassword(newPassword, { minLength: 10 })) {
    //     return res.status(400).render('newPassword', { errorMessage: null, errorMessage1: 'The password must be at least 10 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.' });
    // }

    // Check if the password and confirmPassword match
    if (newPassword !== newPasswordConfirm) {
        return res.status(400).render('newPassword.ejs', { errorMessage: null, errorMessage1: 'Passwords do not match!' });
    }

    // Compare the current password to the user's password in the database
    const getUserPasswordQuery = `SELECT password FROM users WHERE id = ?`;
    const [rows] = await query(getUserPasswordQuery, [userId]);
    const passwordMatch = await bcrypt.compare(currentPassword, rows[0].password);

    if (!passwordMatch) {
        return res.status(400).render('newPassword', { errorMessage: 'The current password is incorrect.', errorMessage1: null });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Get the user's password history from the database
    const getUserPasswordHistoryQuery = `SELECT password_history FROM users WHERE id = ?`;
    const [historyRows] = await query(getUserPasswordHistoryQuery, [userId]);
    const passwordHistory = historyRows[0]?.password_history ? JSON.parse(historyRows[0].password_history) : [];

    console.log('User password history:', passwordHistory);

    // Check if the new password matches any of the last three passwords
    const previousPasswords = passwordHistory.slice(0, 3).map((password) => bcrypt.compareSync(newPassword, password));
    if (previousPasswords.some((match) => match)) {
        return res.status(400).render('newPassword', { errorMessage: null, errorMessage1: 'The new password must not match any of the last three passwords.' });
    }

    // Hash the previous passwords and add the current password to the user's password history
    const previousPasswordHashes = passwordHistory.slice(0, 2).map((password) => bcrypt.hashSync(password, 10));
    const currentPasswordHashed = bcrypt.hashSync(newPassword, 10);
    const updatedPasswordHistory = [currentPasswordHashed, ...previousPasswordHashes];

    console.log('Updated password history:', updatedPasswordHistory);

    // Update the user's password history in the database
    const updatePasswordHistoryQuery = `UPDATE users SET password_history = ? WHERE id = ?`;
    await query(updatePasswordHistoryQuery, [JSON.stringify(updatedPasswordHistory), userId]);

    console.log('Password history updated in the database.');

    // Update the user's password in the database
    const updatePasswordQuery = `UPDATE users SET password = ? WHERE id = ?`;
    await query(updatePasswordQuery, [hashedPassword, userId]);

    console.log('Password updated in the database.');

    res.redirect('/');
});



module.exports = router; 