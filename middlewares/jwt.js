// import jwt

const jwt=require('jsonwebtoken')

const jwtmiddleware=(req,res,next)=>{
    console.log('inside jwt middleware');
    // console.log(req.headers);
    const token=req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        const jwtResponse=jwt.verify(token,"secretkey")
        // console.log(jwtResponse);
        req.payload = { userId: jwtResponse.userId }; 
        // console.log(req.payload)
        next()

    }catch(err){
        console.log('njnsdkn')
        res.status(401).json('Authorization failed...please login')
    }

}
module.exports=jwtmiddleware