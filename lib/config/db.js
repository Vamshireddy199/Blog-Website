import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect("mongodb+srv://vamshireddy199:miniproject07@cluster0.6cwl1.mongodb.net/next-blog-app");
    console.log("DB Connected");
}

export default ConnectDB;
