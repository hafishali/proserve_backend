const workers=require('../model/workerschema')

const jwt=require('jsonwebtoken')
console.log('inside controller')

// register

exports.register=async(req,res)=>{
    console.log('inside the user controller')
    try {

        const{name,username,email,password,phone,address,job,city,district,dailywage,coworkers,image,status}=req.body

        const existuser=await workers.findOne({email})
    
        if(existuser){
            res.status(406).json('user already exists')
        }
        else{
    
            const newworker=new workers({
                name,
                username,
                email,
                password,
                phone,
                address,
                job,
                city,
                district,
                dailywage,
                coworkers,
                image,
                status
  
            })
            await newworker.save()
            res.status(200).json(newworker)
            
        }
        
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
        
    }
  
}

// login

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const existinguser=await workers.findOne({email,password})
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

// update

// exports.updateProfile=async(req,res)=>{
//     // const{id}=req.params
//     const {userId}=req.payload
//     console.log(userId)
//     const {name,username, email, password,phone,address,job,city, district,dailywage,coworkers,image,status}=req.body
//     const uploadedprojectImage=req.file?req.file.filename:image

//     try {
//         const profileupdate=await users.findByIdAndUpdate({_id:userId},{name,username,email,password,phone,address,job,city,district,coworkers,dailywage,image:uploadedprojectImage},{new:true})

//         await profileupdate.save()
//         res.status(200).json(profileupdate)
        
//     } catch (err) {
//         res.status(401).json(err)
//     }
// }

exports.updateProfile = async (req, res) => {
    const { userId } = req.payload;
    console.log(`con:${userId}`);  

    const { name, username, email, password, phone, address, job, city, district, dailywage, coworkers, image, status } = req.body;
    const uploadedprojectImage = req.file ? req.file.filename : image;

    try {
        const profileupdate = await workers.findByIdAndUpdate(
            { _id: userId },
            { name, username, email, password, phone, address, job, city, district, coworkers, dailywage, image: uploadedprojectImage },
            { new: true }
        );

        await profileupdate.save();
        res.status(200).json(profileupdate);
    } catch (err) {
        res.status(401).json(err);
    }
};



