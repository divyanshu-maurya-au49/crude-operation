const express = require("express")
const dotenv = require('dotenv')
const connecdDB = require("./config/db")
const app = express()
dotenv.config()


//routes import
const userRoutes = require('./routes/userRoutes')

//mongodb connection
connecdDB()

app.use(express.json());

app.use('/api/v1/user', userRoutes)

// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message:"Node server is connected"
//     })
// })

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is runing on port number ${PORT}`);
})