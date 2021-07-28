const rateLimit = require("express-rate-limit");

exports.createAccountLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // start blocking after 5 requests
    message: "Too many request created accounts from this IP, please try again after an 5 minutes",
});