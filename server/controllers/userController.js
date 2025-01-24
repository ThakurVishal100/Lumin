import { User } from "../models/userModel.js";
// const { User } = require('../models/userModel');
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, role });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error on register", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log("error on login", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("error on logout", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId=req.id;
    const user=await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    console.log("error on get user profile", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user profile",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId=req.id;
    const {name}=req.body;
    const profilePhoto=req.file;

    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }

    const updatedData={name,photoUrl};
  } catch (error) {
    console.log("error on update user profile", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user profile",
    })
    
  }
}
