import { STATUS } from "@/const/httpStatus";
import { AuthRequest } from "@/interfaces/user.interface";
import { UserService } from "@/services/implementation/user-service";
import { Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  async profileUpdate(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      if (req.user) {
        const { success, message, updatedUser } =
          await this.userService.userProfile(data, req.user?._id.toString());
        if (success)
          return res.status(STATUS.SUCCESS.code).json({ success, updatedUser });
        else
          return res.status(STATUS.BAD_REQUEST.code).json({ success, message });
      } else
        return res
          .status(STATUS.UNAUTHORIZED.code)
          .json({ message: STATUS.UNAUTHORIZED.message });
    } catch (err) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
}

export const user_controller = Container.get(UserController);
