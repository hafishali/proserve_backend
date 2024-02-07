const express=require ('express')

const router=new express.Router()

const usercontroller=require('../controllers/usercontroller')
const workcontrol=require('../controllers/workercontroller')
const admincontroller=require('../controllers/admincontroller')
const jwtmiddleware=require('../middlewares/jwt')
const multerconfigure=require('../middlewares/multer')

// user register
router.post('/user/register',usercontroller.register)

// user login

router.post('/user/login',usercontroller.login)

// book works


// get works


// worker register

router.post('/worker/register',workcontrol.register)

// worker login

router.post('/worker/login',workcontrol.login)

// worker update

router.put('/worker/update',jwtmiddleware,multerconfigure.single('image'),workcontrol.updateProfile)

// admin login

router.post('/admin/login',admincontroller.adminlogin)

// admin:view workers

router.get('/admin/viewworkers',jwtmiddleware,admincontroller.getallworkers)

// admin approvel

router.put('/admin/approve/:id',jwtmiddleware,admincontroller.approveProfile)




module.exports=router