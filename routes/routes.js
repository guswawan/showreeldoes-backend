const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const student_controller = require('../controllers/student.controller');


//REGISTER USER
router.post('/register/:id', user_controller.user_create);

//LOGIN USER
router.post('/login', user_controller.user_login);
router.get('/me', user_controller.user_dashboard);

//LOGOUT USER
router.get('/logout',user_controller.user_logout);

//GET USERS
router.get('/users', user_controller.users_all);

//GET USER BY ID
router.get('/user/:id', user_controller.users_detail);

//UPDATE USER
router.put('/user/:id', user_controller.user_update);

//DELETE USER
router.delete('/user/:id', user_controller.user_delete);

//POST STUDENT
router.post('/student', student_controller.student_create);

//GET STUDENT
router.get('/students', student_controller.students_all);

//GET STUDENT BY ID
router.get('/student/:id', student_controller.students_detail);

//UPDATE STUDENT
router.put('/student/:id', student_controller.student_update);

//DELETE STUDENT
router.delete('/student/:id', student_controller.student_delete);


module.exports = router;