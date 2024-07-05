//creating token and storing in cookie
const sendToken = (user,statusCode,res)=>{
      const token = user.getJWTToken();
      const options = {
        expires:new Date(
          Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
      };
      res.status(statusCode).cookie("token",token,options).json({ //name of cookie is token,value stored in this cookie is token created and options with options set above
        success:true,
        user,
        token,
      });
    };
    module.exports = sendToken;
    