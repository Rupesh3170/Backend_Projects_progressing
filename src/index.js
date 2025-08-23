//require('dotenv').config({path:'./env'})    --it is also fine 
import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!!",err);
})






































/* methods for connection of databse in the same file 
//examples for connecting to mongo db method1 directly write in the main file 
//which is index.js







import express from "express"
const app=express()

// function connectDB(){}           method 1-> for connecting db
// connectDB()

//best way-->
;(async()=>{

    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       //listners  (it is the part of express)
       app.on("error",(error)=>{
        console.log("app not able to talk to database");
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`app is listening on port ${process.env.PORT}`)
       })


    }catch(error){
        console.log("ERROR:",error)
        throw err

    }

})()  */