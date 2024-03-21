const users=require('../model/userschema')
const workers=require('../model/workerschema')

const jwt=require('jsonwebtoken')

// admin login

exports.adminlogin=async(req,res)=>{
    const {email,password}=req.body
    try{
         const adminmail='admin@gmail.com'
         const adminpswd='admin123'

         if(email==adminmail || password==adminpswd){
            const existinguser=await users.findOne({email,password})
            console.log(existinguser);
            if(existinguser  ){
                const token= jwt.sign({userId:existinguser._id},'secretkey')
               
                res.status(200).json({existinguser,token})
            }
            else{
                res.status(404).json('invalid email or password')
            }


         }
         else{
            res.status(406).json('not an admin')
         }
       
           
         
        
       
    }catch(err){
        res.status(401).json(`register request failed due to${err}`)
    }
}

// get all workers

exports.getallworkers=async(req,res)=>{

    
    
    try {
        const allworkers=await workers.find()
        res.status(200).json(allworkers)
        
    } catch (err) {
        res.status(406).json(`error occured due to ${err}`)
        
    }
}

// approval

exports.approveProfile = async (req,res) => {
    // const { userId } = req.payload;
    // console.log(`con:${userId}`);  

    const {id}=req.params

    const { name, username, email, password, phone, address, job, city, district, dailywage, coworkers, image, status } = req.body;
   
    if(userId =='65c091bc3dd30b3790f4a0fa'){
        try {
            const profileupdate = await workers.findByIdAndUpdate(
                { _id: id },
                { status },
                { new: true }
            );
    
            await profileupdate.save();
            res.status(200).json(profileupdate);
            console.log(profileupdate)
        } catch (err) {
            res.status(401).json(err);
        }

    }
    else{
        res.status(401).json('only admin can approve')
    }
    
};