import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    },
    {timestamps: true}
);

const EmailModel = mongoose.models.email || mongoose.model('email',Schema);

export default EmailModel;