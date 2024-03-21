const bookings=require('../model/bookingschema')


// user:booking
exports.book=async(req,res)=>{
    console.log('inside the user controller')
    try {
        const { userId } = req.payload;

        const{worker_name, job,name,phone,city,date,district,description,address,status,workerId}=req.body

            const newbooking=new bookings({
                worker_name,
                job,
                name,
                phone,
                city,
                date,
                district,
                description,
                address,
                status,
                workerId,
                userId
  
            })
            await newbooking.save()
            res.status(200).json(newbooking)
            
          
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
        
    }
  
}

// worker:view bookings
exports.getAllbookings=async(req,res)=>{
    const { userId } = req.payload;
    console.log(userId)
    


    try {
        const allbookings=await bookings.find({workerId:userId})
       
         res.status(200).json(allbookings)
        
        
    } catch (err) {
        res.status(406).json(`error occured due to ${err}`)
        
    }
}

// worker:approve booking

exports.approveProfile = async (req,res) => {
    // const { userId } = req.payload;
    // console.log(`con:${userId}`);  

    const {id}=req.params

    const { name, username, email, password, phone, address, job, city, district, dailywage, coworkers, image, status } = req.body;
   
    
        try {
            const bookingupdate = await bookings.findByIdAndUpdate(
                { _id: id },
                { status },
                { new: true }
            );
    
            await bookingupdate.save();
            res.status(200).json(bookingupdate);
            console.log(bookingupdate)
        } catch (err) {
            res.status(401).json(err);
        }

   
    
};

// user:bookig history
exports.bookingHistory=async(req,res)=>{
    const { userId } = req.payload;
    console.log(`${userId}`)
    


    try {
        const allbookings=await bookings.find({userId:userId})
       
         res.status(200).json(allbookings)
        
        
    } catch (err) {
        res.status(406).json(`error occured due to ${err}`)
        
    }
}


// user:cancel booking

exports.cancelBooking=async (req,res)=>{
    const{id}=req.params
    console.log(id)
    console.log('insidw')

    try {

        const bookcancel=await bookings.findByIdAndDelete({_id:id})
        console.log(bookcancel)
        res.status(200).json(bookcancel)

        
    } catch (err) {
        res.status(401).json(err)

    }
}