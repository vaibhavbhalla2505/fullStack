import { RequestHandler } from "express";
import { user } from "../model/userModel.js";

export const createUser:RequestHandler=async(req,res)=>{
    try {
        const email=req.body.email;
        if(!email){
            res.status(400).send({
                success: false,
                message: "Email field is required.",
            });
            return;
        }
        const existingUser=await user.findOne({where:{email}});
        if(existingUser){
            res.status(200).send({
                success: true,
                message: "User already exists.",
            });
            return;
        }else{
            const User = await user.create({email} as any);
            res.status(200).send({
                message: "User created successfully",
                data: user,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}
export const checkData:RequestHandler = async(req, res) => {
    try {
        const email=req.body.email;
        if(!email){
            res.status(400).send({
                success: false,
                message: "Email field is required.",
            });
            return;
        }
        const existingUser=await user.findOne({where:{email}});
        console.log(existingUser);
        if(existingUser){
            res.status(200).send({
                success: true,
                message: "User verified successfully",
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}
