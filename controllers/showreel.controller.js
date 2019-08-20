const Showreel = require('../models/showreel.model');
const Student = require('../models/student.model');


module.exports = {
    //POST SHOWREEL
    showreel_create: function (req, res) {
        Showreel.create({
            title: req.body.title,
            description: req.body.description,
            fileUpload: req.body.fileUpload, 
            id_student: req.params.id
        },
        (err, result) => {
            if (err) {
                return res.status(500).send("There was problem registering the user");
            } else {
                Student.findByIdAndUpdate(req.params.id, {
                    //KALO DATANYA ARRAY DI TAMBAH $PUSH: {} :*
                    $push: {showreels: result} //$push: {id_showreel: result._id}
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
                            result: result,
                            response: response,
                            message: "success"
                        })
                    }
                });
                console.log("zzz", result)
            }
        });
        // Showreel.create(req.body, (err, showreels) => {
        //     if (err) {
        //         res.status(400).json({
        //             success: false,
        //             message: "Error cant create showreel"
        //         })
        //     } else {
        //         res.status(200).json({
        //             success: true,
        //             showreels: showreels
        //         })
        //     }
        // })
    },

    //GET SHOWREEL
    showreel_all: function (req, res) {
        // Showreel.find({}, (err, showreels) => {
        Showreel.find({}).populate('id_student').exec((err, showreels) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Error"
                })
            } else {
                res.json({
                    success: true,
                    showreels: showreels
                })
            }
        })
    },

    //GET SHOWREEL BY ID
    showreel_detail: function (req, res) {
        Showreel.findById(req.params.id).populate('id_student').exec((err, results) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error cant find showreel"
                })
                
            } else {
                res.status(200).json({
                    success: true,
                    results: results
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
                    updated: updated,
                    message: "Success updated showreel"
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
                Student.updateOne({
                    $pull: {showreels: deleted}
                },
                (err, response) => {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            err: err
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            deleted: deleted,
                            response: response,
                            message: "Success deleted showreel"
                        })
                    }
                })
                console.log('heii,,,,,', {deleted});
            }
        })
    }
}