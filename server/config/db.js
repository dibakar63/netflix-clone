import mongoose from "mongoose";
import colors from 'colors'

const connectDB =async()=>{
    try {
       const conn =await mongoose.connect('mongodb+srv://dibakardey63:abcdefgh1234@recipes.rglhoml.mongodb.net/ecommerce') 
       console.log(`connected to Mongodb database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white)
    }
}
export default connectDB;