const Student = require('../models/student.model');



module.exports = {

    //POST STUDENT
    student_create: function (req, res) {
        const student = req.body
        Student.findOne({
            email: req.body.email
        })

            .then(user => {
                if (!user) {
                    Student.create(student)
                        .then((users, result) => {
                            res.json({
                                message: users + 'Registered Success'
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
            .catch(err => {
                res.send('Error' + err)
            })
    },

    //GET STUDENT
    students_all: function (req, res) {
        Student.find({}).populate('id_showreel').exec((err, students) => {
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
        Student.findById(req.params.id).populate('showreels.id_showreel').populate('id_user')
        .exec((err, student) => {
            if (err) {
                res.json({
                    status: false,
                    error: err
                })
            } else {
                res.json({
                    status: true,
                    student: student  
                })
            }
        }
)
    },

    //PUT STUDENT
    student_update: function (req, res) {
        let updateStudent = req.body;
        Student.findOneAndUpdate({
            _id: req.params.id
        }, updateStudent, err => {
            if (err) {
                res.json({
                    status: false,
                    error: err
                })
            } else {
                console.log("berhasil", updateStudent)
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
            _id: req.params.id
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