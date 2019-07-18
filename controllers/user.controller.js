const User = require('../models/user.model');
const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//POST USER
exports.user_createbyid = function (req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;
        User.create({
            username: req.body.username,
            password: hash,
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
                            console.log("Hasil", response)
                            if (err) {
                                res.json({
                                    success: false,
                                    error: err
                                })
                            } else {
                                res.json({
                                    success: true,
                                    results: results,
                                    message: "success"
                                })
                            }
                        });
                }
            });
    });
};

//LOGIN USER
exports.user_login = async function (req, res) {
    if (req.body.password && req.body.username) {
        User.findOne({ username: req.body.username }, (err, user) => {
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (err) return res.status(500).send(
                "Error on the server"
            );
            if (!user) return res.status(404).send(
                "No user found"
            );
            console.log(user)

            if (!passwordIsValid) {
                return res.status(401).json({
                    login: false,
                    message: "Invalid username or password"
                })
            } else {
                let token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
                User.findByIdAndUpdate({ _id: user._id }, { token: token }, (err, update) => {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            error: "Cant update"
                        })
                    } else {
                        User.findOne({
                            username: req.body.username
                        }, (err, id) => {
                            if (err) {
                                res.status(400).json({
                                    success: false,
                                    msg: "Error cant get by id"
                                })
                            } else {
                                res.status(200).json({
                                    success: true,
                                    update: id,
                                    message: 'Success Update!'
                                })
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.status(400).json({
            msg: "Masukkan password"
        })
    }
}


exports.user_dashboard = function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).json({
            auth: false,
            message: 'No token provided.'
        });

    jwt.verify(token, 'secret', //dari config.secret diubah ke secret
        function (err, decoded) {
            if (err)
                return res.status(500).json({
                    auth: false,
                    message: "Failed to authenticate token"
                })

            //if everythin good
            req.userId = decoded.id;
            // next();
            User.findById(req.userId,
                // {password: 0}, //projection password
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem finding the user.");
                    if (!user) return res.status(404).send("No user found.");

                    res.status(200).json(user);
                });
        });

};


//USER LOGOUT
exports.user_logout = function (req, res) {
    let logout = {
        token: null
    }
    User.findByIdAndUpdate(req.params.id, logout, (err, update) => {
        if (err) {
            res.status(400).json({
                msg: "Error cant logout"
            })
        } else {
            res.status(200).json({
                login: false,
                message: "Yu're logout.",
                update: update

            })
        }
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
    // var token = req.headers['x-access-token'];
    // if (!token)
    //     return res.status(403).json({
    //         auth: false,
    //         message: 'No token provided.'
    //     });

    // jwt.verify(token, 'secret', //dari config.secret diubah ke secret
    //     function (err, decoded) {
    //         if (err)
    //             return res.status(500).json({
    //                 auth: false,
    //                 message: "Failed to authenticate token"
    //             })

    //         //if everythin good
    //         req.userId = decoded.id;
    // next();
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        let updateUser = {
            username: req.body.username,
            password: hash
        }
        console.log(hash)
        if (err) {
            console.log(false)
        } else {
            User.findByIdAndUpdate(req.params.id, updateUser, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    })
                } else {
                    res.json({
                        success: true,
                        message: "User updated successfully!",
                    })
                }
            })
        }
    })
    // });
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

