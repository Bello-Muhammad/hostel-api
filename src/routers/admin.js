const express = require('express');
const router = new express.Router();
const adminController = require('../controller/adminController')
const {isAdmin, authPage} = require('../middleware/auth')



router.get('/admin_signup', adminController.get_adminDetail);

router.post('/admin_signup', adminController.post_adminDetail);

router.get('/admin_login', adminController.get_adminLogin);

router.post('/admin_login', adminController.post_adminLogin);

router.get('/adminmyHostels', isAdmin, authPage(["admin"]),adminController.get_adminHomePage);

router.get('/adminrooms', isAdmin, authPage(["admin"]),adminController.get_rooms);

router.post('/adminrooms', adminController.post_rooms);

router.get('/addhostel', isAdmin, authPage(["admin"]),adminController.get_addHostel);

router.post('/addhostel', adminController.post_addHostel);


module.exports = router;