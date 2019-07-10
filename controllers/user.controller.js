const User = require('../models/user.model');
const Student = require('../models/student.model');
const bcrypt = require('bcrypt');


//POST USER
exports.user_create = function (req, res) {
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
                    id_user: results._id
                }, (err, response) => {
                    console.log("Hasil", response)
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        })
                    } else {
                        res.json({
                            success: true,
                            results: "success"
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