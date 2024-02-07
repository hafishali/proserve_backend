const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 characters']
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
    }


})

const users= mongoose.model("users",userSchema)

module.exports=users