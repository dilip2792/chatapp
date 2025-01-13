import User from "../models/user.model.js";
import bycrypt from "bcryptjs"
import createTokenAndSaveCookies from "../jwt/generateToken.js"
export const signup=async (req,res)=>{
    const {fullname,email,password,confirmPassword}=req.body;
    try{
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password do not match"});
            }
            const user=await User.findOne({email})
            if(user){
                return res.status(400).json({error:"User already exist"});
            }
            //Hashing Password
            const hashPassword=await bycrypt.hash(password,10)
            const newUser=await new User({
                fullname,
                email,
                password:hashPassword,
            })
            await newUser.save();
            if(newUser){
                createTokenAndSaveCookies(newUser._id,res);
                res.status(201).json({massage:"New user created",user:{
                    _id:newUser._id,
                    fullname:newUser.fullname,
                    email:newUser.email
                    },});
            }
           
    } catch(error){
            console.log(error)
            res.status(500).json({error:"Internal server error"});
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid user credentials" });
      }
  
      // Compare passwords
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid user credentials" });
      }
  
      // Create token and save cookies
      createTokenAndSaveCookies(user._id, res);
  
      // Respond with user data
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (error) {
      console.log("Error during login: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
export const logout=async(req,res)=>{
    try{
        res.clearCookie("jwt")
        res.status(200).json({message:"User logged out successfully"})
    }catch(error){
        console.log(error)
    res.status(500).json({error:"Internal server error"});
    }
}
 
export const allUsers=async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const allUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password");
        res.status(201).json({
            allUsers,
        })
    }catch(error){
        console.log("Error in allUsers Controller:"+error)
    }
}