const Department = require('../models/department.model');

module.exports = {
    //POST DEPARTMENT
    department_create: function (req, res) {
        Department.create(req.body, (err, department) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Cant create department!"
                })
            } else {
                res.status(200).json({
                    success: true,
                    department: department
                })
            }
        })
    },

    //GET DEPARTMENT
    department_all: function (req, res) {
        Department.find((err, departments) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Cant get department!"
                })
            } else {
                res.status(200).json({
                    success: true,
                    departments: departments
                })
            }
        })
    },

    //GET DEPARTMENT BY ID
    department_detail: function (req, res) {
        Department.findById(req.params.id, (err, result) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Cant get department by id!"
                })
            } else {
                res.status(200).json({
                    success: true,
                    result: result
                })
            }
        })
    },

    //PUT DEPARTMENT BY ID
    department_update: function (req, res) {
        Department.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, updated) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Cant update department!"
                })
            } else {
                res.status(200).json({
                    success: true,
                    updated: "Success updated!"
                })
            }
        })
    },

    //DELETE DEPARTMENT BY ID
    department_delete: function (req, res) {
        Department.findByIdAndDelete({
            _id: req.params.id
        }, (err, deleted) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Cant deleted department"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success Deleted"
                })
            }
        })
    }
}