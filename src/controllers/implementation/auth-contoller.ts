import Container, { Service } from "typedi";
import { IAuthControl } from "../interface/auth-controller";
import { AuthService } from "@/services/implementation/auth-service";
import { Request, Response } from "express";
import { STATUS } from "@/const/httpStatus";
import { STATES } from "mongoose";

@Service()
export class AuthController implements IAuthControl {
  constructor(private authService: AuthService) {}
  async register(req: Request, res: Response) {
  
    const {success,message,token,user} =  await this.authService.userRegister(req.body)
    if(success) res.status(STATUS.CREATED.code).json({success,message,token,user})
        else res.status(STATUS.BAD_REQUEST.code).json({message,success})
  }
  async login(req: Request, res: Response) {
    res.send("hello");
  }
}

export const auth_controller = Container.get(AuthController);
