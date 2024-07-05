const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please enter your name"],
    maxLength:[30,"Name cannot exceed 30 characters"],
    minLength:[4,"Name should have atleast 4 characters"],
  },
  email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please enter a valid email"],
  },
  password:{
    type:String,
    required:[true,"Please enter your password"],
    minLength:[8,"Password should contain atleast 8 characters"],
    select:false,//means whenever admin sees user's info this field will not be shown to him also
  },
  avatar:{
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      },
  },
  role:{
    type:String,
    default:"admin",
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});

//see use of pre hook in mongoose
userSchema.pre("save",async function(next){
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password,10);//10 is  number of rounds of salting factor(see what is salting)
});
    
//to generate token
userSchema.methods.getJWTToken = function() {
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
  });
};


userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);//see how internally compare function is working
};

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){

  //Generating token 
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding to resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now()+15*60*1000;//expires after 15 minutes
  return resetToken;//returning resetToken not resetPasswordToken  

};
module.exports = mongoose.model("User",userSchema);