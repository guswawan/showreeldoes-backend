const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const student_controller = require('../controllers/student.controller');
const showreel_controller = require('../controllers/showreel.controller');
const department_controller = require('../controllers/department.controller');
const about_controller = require('../controllers/about.controller');
const partner_controller = require('../controllers/partner.controller');
const auth = require('../config/auth.config');
const discuss_controller = require('../controllers/discuss.controller');
const upload_controller = require('../controllers/upload.controller');
const upload = require('../config/multerConfig');


/*+++ USER +++*/
//REGISTER USER
/*router.post('/register/:id', user_controller.user_create);*/
//LOGIN USER
router.post('/login', user_controller.user_login);
router.get('/me', auth, user_controller.user_dashboard);
//LOGOUT USER
router.post('/logout/:id', user_controller.user_logout);
//POST USER BY ID
router.post('/user/:id', user_controller.user_createbyid);
//GET USERS
router.get('/users', /*auth,*/ user_controller.users_all);
//GET USER BY ID
router.get('/user/:id', /*auth,*/ user_controller.users_detail);
//UPDATE USER
router.put('/user/:id', /*auth,*/ user_controller.user_update);
//DELETE USER
router.delete('/user/:id', /*auth,*/ user_controller.user_delete);

/*+++ STUDENT +++*/
//POST STUDENT
router.post('/student', student_controller.student_create);
//GET STUDENT
router.get('/students', student_controller.students_all);
//GET STUDENT BY ID
router.get('/student/:id', student_controller.students_detail);
//UPDATE STUDENT
router.put('/student/:id', /*auth,*/ student_controller.student_update);
//DELETE STUDENT
router.delete('/student/:id', /*auth,*/ student_controller.student_delete);

/*+++ SHOWREEL +++*/
//GET SHOWREEL
router.get('/showreels', showreel_controller.showreel_all);
//GET SHOWREEL BY ID
router.get('/showreel/:id', showreel_controller.showreel_detail);
//POST SHOWREEL
router.post('/showreel/:id', /*auth,*/ showreel_controller.showreel_create);
//UPDATE SHOWREEL
router.put('/showreel/:id', /*auth,*/  showreel_controller.showreel_update);
//DELETE SHOWREEL
router.delete('/showreel/:id', /*auth,*/ showreel_controller.showreel_delete);

/*+++ DEPARTMENT +++*/
//POST DEPARTMENT
router.post('/department', /*auth,*/ department_controller.department_create);
//GET DEPARTMENT
router.get('/departments', department_controller.department_all);
//GET DEPARTMENT BY ID
router.get('/department/:id', department_controller.department_detail);
//UPDATE DEPARTMENT
router.put('/department/:id', /*auth,*/ department_controller.department_update);
//DELETE DEPARTMENT
router.delete('/department/:id', /*auth,*/ department_controller.department_delete);

/*+++ ABOUT +++*/
//POST ABOUT
router.post('/about', /*auth,*/ about_controller.about_create);
//GET ABOUT
router.get('/abouts', about_controller.about_all);
//GET ABOUT BY ID
router.get('/about/:id', about_controller.about_detail);
//UPDATE ABOUT
router.put('/about/:id', /*auth,*/ about_controller.about_update);
//DELETE ABOUT
router.delete('/about/:id',/*auth,*/ about_controller.about_delete);

/*+++ PARTNER +++*/
//POST PARTNER
router.post('/partner', /*auth,*/ partner_controller.partner_create);
//GET PARTNER
router.get('/partners', partner_controller.partner_all);
//GET PARTNER BY ID
router.get('/partner/:id', partner_controller.partner_detail);
//UPDATE PARTNER
router.put('/partner/:id', /*auth,*/ partner_controller.partner_update);
//DELETE PARTNER
router.delete('/partner/:id', /*auth,*/ partner_controller.partner_delete);

/*+++ DISCUSS +++*/
//POST DISCUSS
router.post('/publishdiscuss', discuss_controller.discuss_create);
//GET DISCUSS
router.get('/discusses', discuss_controller.discuss_all);
//GET DISCUSS BY ID
router.get('/discuss/:id', discuss_controller.discuss_detail);
//UPDATE DISCUSS
router.put('/updatediscuss/:id', discuss_controller.discuss_update);
//DELETE DISCUSS
router.delete('/deletediscuss/:id', discuss_controller.discuss_delete);

/*+++ UPLOAD +++*/
// router.post('/uploads', upload.array('cloudImage',3), upload_controller.upload_create);
router.post('/upload', upload, upload_controller.upload_create);
router.get('/uploads', upload_controller.upload_getall);
router.get('/upload/:id', upload_controller.upload_detail);
router.put('/upload/:id', upload.any(), upload_controller.upload_update);
router.post('/upload/:id', upload_controller.upload_delete);


module.exports = router;