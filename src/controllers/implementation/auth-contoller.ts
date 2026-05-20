import Container, { Service } from "typedi";
import { IAuthControl } from "../interface/auth-controller";
import { AuthService } from "@/services/implementation/auth-service";
import { Request, Response } from "express";
import { STATUS } from "@/const/httpStatus";

@Service()
export class AuthController implements IAuthControl {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { success, message, token, user } =
        await this.authService.userRegister(req.body);
      if (success)
        res.status(STATUS.CREATED.code).json({ success, message, token, user });
      else res.status(STATUS.BAD_REQUEST.code).json({ message, success });
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
        console.log(success,token);
        
      if (success)
        return res
          .status(STATUS.SUCCESS.code)
          .json({ user,success, token, message: "user Logged in" });
      else
        return res.status(STATUS.BAD_REQUEST.code).json({ success, message });
    } catch (err) {}
  }
 
}

export const auth_controller = Container.get(AuthController);
