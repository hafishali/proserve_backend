// import .env

require('dotenv').config()

//import express

const express=require('express')

// import cors

const cors=require('cors')



// import connections

require('./DB/connection')

// create server

const proserver=express()

// import router

const router=require('./Routers/router')

// use cors

proserver.use(cors())

proserver.use(express.json())

// use router

proserver.use(router)

// proserver.use('/uploads',express.static('./uploads'))
proserver.use('/uploads',express.static('./uploads'))



const PORT=4015 || process.env

proserver.listen(PORT,()=>{
    console.log(`server running successfully at port:${PORT}`)
})



