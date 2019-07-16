const Showreel = require('../models/showreel.model');
const Student = require('../models/student.model');

module.exports = {
    //POST SHOWREEL
    showreel_create: function (req, res) {
        Showreel.create(req.body, (err, showreels) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error cant create showreel"
                })
            } else {
                res.status(200).json({
                    success: true,
                    showreels: showreels
                })
            }
        })
    },

    //GET SHOWREEL
    showreel_all: function (req, res) {
        Showreel.find((err, showreel) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Error"
                })
            } else {
                res.json({
                    success: true,
                    showreel: showreel
                })
            }
        })
    },

    //GET SHOWREEL BY ID
    showreel_detail: function (req, res) {
        Showreel.findById(req.params.id, (err, showreels) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error cant find showreel"
                })
            } else {
                res.status(200).json({
                    success: true,
                    showreel: showreels
                })
            }
        })
    },

    //PUT SHOWREEL BY ID
    showreel_update: function (req, res) {
        let updateShowreel = req.body
        Showreel.findOneAndUpdate({ _id: req.params.id }, updateShowreel, (err, updated) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error cant update showreel"
                })
            } else {
                res.status(200).json({
                    success: true,
                    updated: "Success updated showreel"
                })
            }
        })
    },

    //DELET SHOWREEL BY ID
    showreel_delete: function (req, res) {
        Showreel.findByIdAndDelete({
            _id: req.params.id
        }, (err, deleted) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Cant deleted showreel"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success deleted showreel"
                })
            }
        })
    }
}