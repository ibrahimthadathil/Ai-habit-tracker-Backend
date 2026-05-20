import { Request, Response } from "express";


export interface IauthService{
    userRegister(req:Request,res:Response):Promise<{success:Boolean,message?:string}>
}
export interface IuserService{
    userProfile(req:Request,res:Response):Promise<{success:Boolean,message?:string}>
}