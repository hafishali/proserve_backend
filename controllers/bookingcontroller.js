const bookings=require('../model/bookingschema')

exports.book=async(req,res)=>{
    console.log('inside the user controller')
    try {

        const{name,phone,city,date,district,description,address,status,workerId}=req.body

            const newbooking=new bookings({
                name,
                phone,
                city,
                date,
                district,
                description,
                address,
                status,
                workerId
  
            })
            await newbooking.save()
            res.status(200).json(newbooking)
            
          
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
        
    }
  
}
