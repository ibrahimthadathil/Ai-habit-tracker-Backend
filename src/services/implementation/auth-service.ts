import { Service } from "typedi";
import { IauthService } from "@/services/interface/auth-service";
import { AuthRepo } from "@/repositories/implementation/user/auth-repository";
import { IUser } from "@/interfaces/user.interface";
import { STATUS } from "@/const/httpStatus";
import { signToken } from "@/utils/jwt-utils";

@Service()
export class AuthService implements IauthService {
  constructor(private authRepo: AuthRepo) {}

  async userRegister(credential: Partial<IUser>) {
    try {
      const { name, email, password } = credential;
      if (!name || !email || !password)
        return {
          success: false,
          message: "Credentials are required",
        };

      if (password.length < 6)
        return {
          success: false,
          message: STATUS.BAD_REQUEST.message,
        };

      const exist = await this.authRepo.findone(email);
      if (exist) return { success: false, message: "User Already Registered" };

      const user = await this.authRepo.create({
        ...credential,
        avatar: name.charAt(0).toUpperCase(),
      });
      const token = signToken(user._id.toString());
      return { success: true, token, user };
    } catch (error) {
      return { success: false, message: STATUS.SERVER_ERROR.message };
    }
  }

  async userLogin(credential: { email: string; password: string }) {
    try {
      const { email, password } = credential;
      if (!email || !password)
        return { success: false, message: "Email and password required" };
      const user = await this.authRepo.findone(email);
      if (!user || !(await user.comparePassword(password))) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      const token = signToken(user._id.toString());

      return { success: true, user, token };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}
