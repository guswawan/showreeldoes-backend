const User = require('../models/user.model');
const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//POST USER
exports.user_create = function (req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;

        User.create({
            username: req.body.username,
            password: req.body.password,
            id_student: req.params.id
        },
        (err, results) => {
            if (err) {
                return res.status(500).send("There was problem registering the user");
            } else {
                Student.findByIdAndUpdate(req.params.id, {
                    id_user: results._id
                }, 
                (err, response) => {
                    let token = jwt.sign({id: results._id}, 'secret',{ expiresIn: 3600 });

                    console.log("Hasil ", response)
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        })
                    } else {
                        res.json({
                            success: true,
                            results: results,
                            token: token
                        })
                    }
                });
            }
        });
    });

    // User.findOne({
    //     username: req.body.username
    // })

    //     .then(user => {
    //         if (!user) {
    //             bcrypt.hash(req.body.password, 10, (err, hash) => {
    //                 req.body.password = hash;
    //                 User.create(req.body)
    //                     .then(user => {
    //                         res.json({
    //                             success: user.username + 'Registered success'
    //                         })
    //                     })
    //                     .catch(err => {
    //                         res.send('Error' + err)
    //                     })
    //             })
    //         } else {
    //             res.json({
    //                 error: 'Username telah tersedia'
    //             })
    //         }
    //     })

    // let user = new User(
    //     {
    //         username: req.body.username,
    //         password: req.body.password
    //     }
    // );
    // console.log(user)

    // user.save((err, user) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             message: 'Failed!',
    //             error: err
    //         });
    //     } else {
    //         console.log('User saved.')
    //         res.status(200).json({
    //             message: 'Success create user.',
    //             user: user
    //         })
    //     }
    // })
};

//LOGIN USER
exports.user_login = function (req, res) {
    User.findOne({username: req.body.username},(err, user) => {
        if (err) return res.status(500).send(
            "Error on the server"
            );
        if (!user) return res.status(404).send(
            "No user found"
            );

        let passwordIsValid = bcrypt.compare(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).json({
            login: false,
            message: "invalid username or password"
        });

        let token = jwt.sign({id: user._id}, 'secret' ,{ expiresIn: 60 });
        res.status(200).json({
            message: "User found!!!",
            data: {user: user},
            token: token
        })
    })
}
exports.user_dashboard = function (req, res) {
    var token = req.headers['x-access-token'];
    if(!token)
        return res.status(403).json({
            auth: false,
            message: 'No token provided.'
        });
    
    jwt.verify(token, 'secret', //dari config.secret diubah ke secret
        function(err, decoded) {
            if (err)
            return res.status(500).json({
                auth: false,
                message: "Failed to authenticate token"
            })
    
            //if everythin good
            req.userId = decoded.id;
            // next();
    });
        
    User.findById(req.userId,
       // {password: 0}, //projection password
        function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
    
        res.status(200).json(user);
    });
};


//USER LOGOUT
exports.user_logout = function (req, res) {
    res.status(200).json({
        login: false,
        message:"Yu're logout.",

    })
}

//GET USERS
exports.users_all = function (req, res) {
    User.find((err, users) => {
        if (err) return res.json({
            succcess: false,
            error: err
        });
        return res.json({
            succcess: true,
            users: users
        })
    })
};

//GET USER BY ID
exports.users_detail = function (req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.json({
            succcess: false,
            error: err
        });
        return res.json({
            succcess: true,
            user: user
        })
    })
};

//PUT USER
exports.user_update = function (req, res) {
    console.log(req.body.password)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            password: hash
        }, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            } else {
                res.json({
                    success: true,
                    message: "User updated successfully!"
                })
            }
        })
    })
};

//USER DELETE
exports.user_delete = function (req, res) {
    let deleteById = {
        _id: req.params.id
    }
    User.findOneAndDelete(deleteById, err => {
        if (err) return res.json(err);
        return res.json({
            succcess: true,
            message: "User deleted!"
        });
    });
};

// exports.login_user = function (req, res) {
//     User.findOne({
//         username: req.body.username
//     })
//         .then(user => {
//             if (user) {
//                 if (bcrypt.compareSync(req.body.password, user.password)) {
//                     let payload = {
//                         _id: user._id
//                     }
//                     let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1440 })
//                     res.send(token)
//                 } else {
//                     res.json({ error: 'User tidak tersedia' })
//                 }
//             } else {
//                 res.json({ error: 'User tidak tersedia' })
//             }
//         })
//         .catch(err => {
//             res.send('error' + err)
//         })
// }