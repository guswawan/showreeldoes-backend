const User = require('../models/user.model');


//POST USER
exports.user_create = function (req, res, next) {
    let user = new User(
        {
                username: req.body.username,
                password: req.body.password
        }
    );
    console.log(user)

    user.save((err, user) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                message: 'Failed!',
                error: err
            });
        } else {
            console.log('User saved.')
            res.status(200).json({
                message: 'Success create user.',
                user: user
            })
        }
    })
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
    let updateUser = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOneAndUpdate({
        _id: req.params._id
    }, updateUser, err => {
        if (err) {
            return res.json({
                succcess: false,
                error:err
            });
        } else {
            return res.json({
                succcess:true,
                message: "User updated!"
            });
        }
    });
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