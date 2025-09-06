import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    email:{
        type: String,
        unique:true
    },
    password: String,
    cart:[
        {
            itemId:{ type : mongoose.Schema.Types.ObjectId , ref: "Item"},
            quantity:{type:Number,default:1},
        },
    ],
});

export default mongoose.models.User || mongoose.model("User",UserSchema);