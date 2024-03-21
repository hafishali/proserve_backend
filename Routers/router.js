const express=require ('express')

const router=new express.Router()

const usercontroller=require('../controllers/usercontroller')
const workcontrol=require('../controllers/workercontroller')
const admincontroller=require('../controllers/admincontroller')
const bookingcontroller=require('../controllers/bookingcontroller')
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

router.put('/admin/approve/:id',admincontroller.approveProfile)

// user:getworker

router.get('/user/viewworkers',jwtmiddleware,usercontroller.getAllworkers)

// user:booking

router.post('/user/book',jwtmiddleware,bookingcontroller.book)

// worker:view bookings

router.get('/worker/viewbookings',jwtmiddleware,bookingcontroller.getAllbookings)

// worker:approve booking

router.put('/booking/approve/:id',bookingcontroller.approveProfile)

// user:booking history

router.get('/user/viewbookings',jwtmiddleware,bookingcontroller.bookingHistory)

// user:cancel booking

router.delete('/booking/cancel/:id',jwtmiddleware,bookingcontroller.cancelBooking)









module.exports=router