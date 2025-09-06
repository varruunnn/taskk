import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req,res) {
    if(req.method!="POST") return res.status(405).end();
    await connectDB();
    const {email,password}=req.body;
    const hash = await bcrypt.hash(password,10);
    try{
        const user = await User.create({email,password:hash});
        res.json({message:"userCreated",userId:user._id})
    }catch(e){
        res.status(400).json({error:"can't create user"})
    }
}