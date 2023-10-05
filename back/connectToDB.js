 import mongoose from "mongoose";

 const connectToDB = async() => {
     try {
         await mongoose.connect('mongodb://127.0.0.1:27017/userDB')

     } catch (error) {
         console.log(error)
         throw new Error(error.message)
     }
 }
 export default connectToDB