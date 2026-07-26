import connectDB from "./db/db.js";
import { configDotenv } from "dotenv";
import express from "express"
import { app } from "./app.js";


configDotenv({
  path: "../.env"
})

connectDB()
.then(() => {
  app.on("ERROR ", (error)=>{
      console.log("ERR: ", error);
      throw error
    });

  app.listen(process.env.PORT, ()=>{
  console.log(`App is Listening at PORT: ${process.env.PORT}`);
  
})
})
.catch((err) => {
  console.log("MongoDb connection Failed !!", err);
})