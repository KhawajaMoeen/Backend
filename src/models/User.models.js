import mongoose, {Schema, model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username:{
    type: String,
    requied: true,
    unique: true, 
    lowercase: true,
    trim: true,
    index: true //IG SEO Reasons... To show name soon and earlier
  },
  email: {
    type: String,
    requied: true,
    unique: true, 
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    requied: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    requied: [true, 'Password is Required']
  },
  avatar: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  watchHistory: {
    type: Schema.Types.ObjectId,
    ref: "Video"
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
})


userSchema.pre("save", async function (next) {

  if(!this.isModified("password")) return next;

  this.password = await bcrypt.hash("this.password", 10)
  next;
})

userSchema.methods.isPasswordCorrect = async function (password){
 return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      duration: process.env.ACCESS_TOKEN_DURATION
    }
  )
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      duration: process.env.REFRESH_TOKEN_DURATION
    }
  )
}


export const User = model("User", userSchema);
