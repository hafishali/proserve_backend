const mongoose=require('mongoose')


const bookingSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
        
    },
    city:{
        type:String,
        require:true,
        
    },
    date:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    description:{
        type:String,
        // require:true
    },
    address:{
        type:String,
        require:true
    },
    status:{
        type:Boolean
    },
    workerId:{
        type:String,
        require:true
    }
 
})

const bookings= mongoose.model("bookings",bookingSchema)

module.exports=bookings