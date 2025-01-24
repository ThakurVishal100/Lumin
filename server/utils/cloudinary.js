import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resourse_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
    
  }
};

export const deleteMediaFromCloudinary=async (public_id)=>{
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteVideoFromCloudinary=async (public_id)=>{
    try {
        await cloudinary.uploader.destroy(public_id, {resource_type: "video"});
    } catch (error) {
        console.log(error);
        
    }
}