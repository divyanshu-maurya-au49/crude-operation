const mongooose = require("mongoose")

const connecdDB = async()=>{
    try {
        await mongooose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB database`);
    } catch (error) {
       console.log(error); 
    }
}
module.exports = connecdDB;