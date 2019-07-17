const User = require('../models/user.model');
const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//POST USER
exports.user_createbyid = function (req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;
        User.create({
            username: req.body.username,
            password: req.body.password,
            id_student: req.params.id
        }, (err, results) => {
            if (err) {
                return err
            } else {
                Student.findByIdAndUpdate(req.params.id, {
                    id_user: results.id,
                    id_showreel: results.id
                }, (err, response) => {
                    console.log("Hasil", response)
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        })
                    } else {
                        // var token = jwt.sign({ id: response._id }, process.env.TOKEN_KEY, { expiresIn: 86400 })
                        res.json({
                            success: true,
                            message: response,
                            // token: token
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
    User.findOne({ username: req.body.username }, (err, user) => {
        console.log(user)
        if (err) return res.status(500).send('Error on the server');
        if (!user) return res.status(404).send('No user found');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user.id_student }, process.env.TOKEN_KEY, { expiresIn: 86400 });

        res.status(200).send({ auth: true, token: token })
    })
}

//LOGOUT USER
exports.user_logout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
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
    let updateUser = req.body
    bcrypt.hash(req.body.password, 10, (err, hash) => {
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

