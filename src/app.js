import express, { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
  origin: "process.env.CORS_ORIGIN",
  credentials: true
}))

app.use(json({limit: "20kb"}))

app.use(urlencoded(
  { extended: true,
    limit: "20kb"
  }
))



app.use(cookieParser())



import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)


export { app }