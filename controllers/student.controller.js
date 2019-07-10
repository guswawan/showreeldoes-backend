const Student = require('../models/student.model');


module.exports = {
    //POST STUDENT
    student_create: function (req, res) {
        let student = {
            status: req.body.status,
            gender: req.body.gender,
            full_name: req.body.full_name,
            department: req.body.department,
            birthday: req.body.birthday,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone
        }
        Student.findOne({
            email: req.body.email
        })

            .then(user => {
                if (!user) {
                    Student.create(student)
                        .then(user => {
                            res.json({
                                message: user.email + 'Registered Success'
                            })
                        })
                        .catch(err => {
                            res.send('Error' + err)
                        })
                } else {
                    res.json({
                        status: "Email telah digunakan"
                    })
                }
            })
    },

    //GET STUDENT
    students_all: function (req, res) {
        Student.find((err, students) => {
            if (err) {
                res.json({
                    status: false,
                    error: err
                })
            } else {
                res.json({
                    status: true,
                    students: students
                })
            }
        })
    },

    //GET STUDENT BY ID
    students_detail: function (req, res) {
        Student.findById(req.params.id, (err, students) => {
            if (err) {
                res.json({
                    status: false,
                    error: err
                })
            } else {
                res.json({
                    status: true,
                    students: students
                })
            }
        })
    },

    //PUT STUDENT
    student_update: function (req, res) {
        let updateStudent = {
            full_name: req.body.full_name,
            department: req.body.department,
            status: req.body.status,
            gender: req.body.gender,
            birthday: req.body.birthday,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            id_user: req.body.id_user,
            profile_pic: req.body.profile_pic
        }
        Student.findOneAndUpdate({
            _id: req.params.id
        }, updateStudent, err => {
            if (err) {
                res.json({
                    status: false,
                    error: err
                })
            } else {
                res.json({
                    status: true,
                    message: "Student updated!"
                })
            }
        })
    },

    //STUDENT DELETE
    student_delete: function (req, res) {
        let deleteById = {
            _id: req.params._id
        }
        Student.findOneAndDelete(deleteById, err => {
            if (err) {
                res.json({
                    status: false,
                    error: err
                })
            } else {
                res.json({
                    status: true,
                    message: "Student Deleted!"
                })
            }
        })
    }
}