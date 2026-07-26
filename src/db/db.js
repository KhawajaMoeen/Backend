import mongoose from "mongoose";
import {dbName} from "../constants.js"



const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGOOSE_URI}/${dbName}`)
    console.log(`DB is Connected !!! DB Host: ${connection.connection.host}`);

  } catch (error) {
    console.log("DB Connection Failed ", error);
    process.exit(1)
    
  }
}

export default connectDB