const express = require('express');
const async = require('hbs/lib/async');
const router = new express.Router();
const hostelController = require('../controller/hostelController');
const {isAuth, authPage} = require('../middleware/auth')



router.get('/', hostelController.homePage);

router.get('/student_login', hostelController.get_studentLogin)

router.post('/student_login', hostelController.post_studentLogin)

router.get('/hostels', isAuth, hostelController.get_hostels);

router.get('/malehostel', isAuth, authPage(["admin", "male"]), hostelController.get_malehostel);

router.get('/femalehostel', isAuth, authPage(["admin", "female"]), hostelController.get_femaleHostel)

router.get('/malerooms', isAuth, authPage(["admin", "male"]), hostelController.get_malerooms)

router.get('/femalerooms', isAuth, authPage(["admin", "female"]), hostelController.get_femalerooms)

router.post('/malerooms', hostelController.post_malerooms)

router.post('/femalerooms', hostelController.post_femalerooms)

router.get('/reserve_bello', isAuth, authPage(["admin", "male"]), hostelController.get_reserveBelloHostel)

router.post('/reserve_bello', hostelController.post_reserveBelloHostel)

router.get('/reserve_namadi', isAuth, authPage(["admin", "male"]),hostelController.get_reserveNamadiHostel)

router.post('/reserve_namadi', hostelController.post_reserveNamadiHostel)

router.get('/reserve_amina', isAuth, authPage(["admin", "female"]),hostelController.get_reserveAminaHostel)

router.post('/reserve_amina', hostelController.post_reserveAminaHostel)

router.get('/reserve_khadija', isAuth, authPage(["admin", "female"]),hostelController.get_reserveKhadijaHostel)

router.post('/reserve_khadija', hostelController.post_reserveKhadijaHostel)

router.get('/reserve', isAuth, hostelController.get_reserve)

router.get('/student_signup', )

router.post('/signup', hostelController.post_studentDetails)



module.exports = router