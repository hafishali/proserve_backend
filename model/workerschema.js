const mongoose=require('mongoose')
const validator = require('validator');

const workerSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 characters']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        // require:true
    },
    job:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    
    dailywage:{
        type:Number,
        require:true
    },
    coworkers:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        // require:true
    },
    status:{
        type:Boolean,
        
    }



})

const workers= mongoose.model("workers",workerSchema)

module.exports=workers