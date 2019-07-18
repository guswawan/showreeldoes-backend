const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

module.exports = function (req, res, next) {
    console.log(req)
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        User.findById(req.user.id, (err, id) => {
            console.log("IKI ID", id)
            if (id.token === token) {
                next()
            } else {
                res.status(402).json({
                    msg: "Token lawas ga iso"
                })
            }
        })
        console.log("ISI REQ USER", req.user)
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
};