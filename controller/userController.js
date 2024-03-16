const userModel = require("../models/usermodel")


exports.sendAllData = async(req,res)=>{
   try {
    const {name,lastname,email,password,project} = req.body

    // //validation
    // if(!name  || !lastname || !email ||  !password || project){
    //     return res.status(400).send({
    //         success:false,
    //         message:"Please Fill All Filds"
    //     })
    // }


    //save data

    const data = new userModel({name,lastname,email,password,project})
    await data.save()
    return res.status(200).send({
        success:true,
        message:"Data Added succesfully",
        data
    })

   } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"Error in data adding",
        error
    })
   } 
}

exports.getAllData = async(req,res)=>{
    try {
        
        const alldata = await userModel.find({})
        if(!alldata){
            return res.status(200).send({
                success:false,
                message:"no data"
            })
        }
        return res.status(200).send({
            success:true,
            dataCound : alldata.length,
            message:"All data list",
            alldata
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in data getting",
            error
        })
    }

}
exports.updateData = async(req,res)=>{
  try {
    const  {id} = req.params
    const {name,lastname,email,password,project} = req.body

    const data = await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
    return res.status(200).send({
        success:true,
        message:"Blog Updated!",
        data
    })

  } catch (error) {
    console.log(error);
    return res.status(400).send({
        success:false,
        message:"Error in data updation",
        error
    })
  }  
}
exports.deleteData = async(req,res)=>{
    try {
    
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Blog Deleted!",
        })
    
      } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error in data deliting",
            error
        })
      } 
}