// import model
const users=require('../model/userschema')
const workers=require('../model/workerschema')

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

// view workers

exports.getAllworkers=async(req,res)=>{

    

    
    
    try {
        const allworkers=await workers.find()
        res.status(200).json(allworkers)
        
    } catch (err) {
        res.status(406).json(`error occured due to ${err}`)
        
    }
}

// google authentication
exports.googleLogin = async (req, res) => {
    const { name, email } = req.body;
    try {
        let user = await users.findOne({ email });

        if (!user) {
            user = new users({ name, email });
            await user.save();
            
        }

        const token = jwt.sign({ userId: user._id }, 'secretkey');
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Google login failed', error });
    }
};