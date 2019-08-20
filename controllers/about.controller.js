const About = require('../models/about.model');
const Upload = require('../models/upload.model');

module.exports = {
    //POST ABOUT
    about_create: function (req, res) {
        About.create(req.body, (err, about) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Cant create about"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success!",
                    about: about
                })
            }
        })
    },

    //GET ABOUT
    about_all: function (req, res) {
        About.find({}, (err, abouts) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Cant get about"
                })
            } else {
                res.status(200).json({
                    success: true,
                    abouts: abouts
                })
            }
        })
    },

    //GET ABOUT BY ID
    about_detail: function (req, res) {
        About.findById(req.params.id, (err, about) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Cant get about by id"
                })
            } else {
                res.status(200).json({
                    success: true,
                    about: about
                })
            }
        })
    },

    //PUT ABOUT BY ID
    about_update: function (req, res) {
        About.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, updated) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Cant updated about"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success update about"
                })
            }
        })
    },

    //PUT ABOUT BY ID
    about_update: function (req, res) {
        let aboutUpdate = {
            content: req.body.content,
            image: req.body.image
        }
        About.findByIdAndUpdate({
            _id: req.params.id
        }, aboutUpdate, (err, updated) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Cant updated about"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success update about",
                    updated: updated
                })
            }
        })
    },

    //DELETE ABOUT BY ID
    about_delete: function (req, res) {
        About.findByIdAndDelete({
            _id: req.params.id
        }, (err, deleted) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Cant delete about"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success Delete",
                    deleted: deleted
                })
            }
        })
    }
}