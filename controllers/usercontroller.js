// import model
const users=require('../model/userschema')

const jwt=require('jsonwebtoken')


// user register
exports.register=async(req,res)=>{
    console.log('inside the user controller')
    try {

        const{name,username,email,password}=req.body
        console.log(req.body)

        const existuser=await users.findOne({email})
    
        if(existuser){
            res.status(406).json('user already exists')
        }
        else{
    
            const newuser=new users({
                name,
                username,
                email,
                password
            })
            await newuser.save()
            res.status(200).json(newuser)
            
        }
        
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
        
    }
  
}

// user login

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const existinguser=await users.findOne({email,password})
        console.log(existinguser);
        if(existinguser){
            const token= jwt.sign({userId:existinguser._id},'secretkey')
           
            res.status(200).json({existinguser,token})
        }
        else{
            res.status(404).json('invalid email or password')
        }
    }catch(err){
        res.status(401).json(`register request failed due to${err}`)
    }
}