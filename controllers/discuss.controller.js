const Discuss = require('../models/discuss.model');

//POST DISCUSS
exports.discuss_create = function (req, res) {
    Discuss.create(req.body, (err, discuss) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Can't publish comment"
            })
        } else {
            res.status(200).json({
                success: true,
                discuss: discuss
            })
        }
    })
};

//GET DISCUSS
exports.discuss_all = function (req, res) {
    Discuss.find((err, discusses) => {
        if (err) {
            res.status(500).json({
                success: false, 
                message: "Can't get all comment"
            })
        } else {
            res.status(200).json({
                success: true,
                discusses: discusses               
            })
        }
    })
};

//GET DISCUSS DETAIL
exports.discuss_detail = function (req, res) {
    Discuss.findById(req.params.id, (err, discuss) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Can't get comment"
            })
        } else {
            res.status(200).json({
                success: true,
                discuss: discuss
            })
        }
    })
};

//PUT DISCUSS
exports.discuss_update = function (req, res) {
    let updateDiscuss = req.body;

    Discuss.findByIdAndUpdate({
        _id: req.params.id
    },updateDiscuss, (err, updated) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Can't update comment"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Comment updated!",
                updated: updated
            })
        }
    })
};

//DELETE DISCUSS
exports.discuss_delete = function (req, res) {
    let deleteById = {
        _id: req.params.id
    }
    Discuss.findByIdAndDelete(deleteById, err => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Can't deleted"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Comment deleted!"
            })
        }
    })
}