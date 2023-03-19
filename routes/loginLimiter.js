const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 3, // max 3 attempts
    keyGenerator: function (req, res) {
        return req.ip; // generate a unique key based on the IP address of the client
    },
    handler: function (req, res, next) {
        req.flash('error', 'Too many login attempts. Please try again later.');
        res.redirect('/');
    }
});

module.exports = loginLimiter; 