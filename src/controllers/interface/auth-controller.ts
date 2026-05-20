import { Request, Response } from "express";

export interface IAuthControl{
     register (req:Request,res:Response):Promise<void>
}