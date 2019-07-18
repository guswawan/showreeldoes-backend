const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];
    if(!token)
        return res.status(403).json({
            auth: false,
            message: "No token provided"
        });

    jwt.verify(token, 'secret', function(err, decoded) {
        if (err)
            return res.status(500).json({
                auth: false,
                message: "Failed to auth token"
            })

        req.userId = decoded.id
        next();
    })
}

module.exports = verifyToken;