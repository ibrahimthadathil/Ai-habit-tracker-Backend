import Container, { Service } from "typedi";
import { IAuthControl } from "../interface/auth-controller";
import { AuthService } from "@/services/implementation/auth-service";
import { Request, Response } from "express";
import { STATUS } from "@/const/httpStatus";
import { AuthRequest } from "@/interfaces/user.interface";

@Service()
export class AuthController implements IAuthControl {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { success, message, token, user } =
        await this.authService.userRegister(req.body);
      if (success)
        res.status(STATUS.CREATED.code).json({ message, token, user });
      else res.status(STATUS.BAD_REQUEST.code).json({ message });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { success, message, token, user } =
        await this.authService.userLogin(req.body);

      if (success)
        return res
          .status(STATUS.SUCCESS.code)
          .json({ user, token, message: "user Logged in" });
      else return res.status(STATUS.BAD_REQUEST.code).json({ message });
    } catch (err) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async currentUser(req:AuthRequest,res:Response) {
    try {
      res.status(STATUS.SUCCESS.code).json({user:req.user})
    } catch (error) {
       res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    
    }
  }
}

export const auth_controller = Container.get(AuthController);
