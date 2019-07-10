const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');


//POST USER
router.post('/user', user_controller.user_create);

//GET USERS
router.get('/users', user_controller.users_all);

//GET USER BY ID
router.get('/user/:id', user_controller.users_detail);

//UPDATE USER
router.put('/user/:id', user_controller.user_update);

//DELETE USER
router.delete('/user/:id', user_controller.user_delete);


module.exports = router;