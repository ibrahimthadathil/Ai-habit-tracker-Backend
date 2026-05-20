import { Service } from "typedi";
import { IuserService } from "../interface/auth-service";
import { UserRepo } from "@/repositories/implementation/user/user-repository";
import { IUser } from "@/interfaces/user.interface";
import { STATUS } from "@/const/httpStatus";


@Service()
export class UserService {
    constructor(
        private userRepo : UserRepo
    ){}
    async  userProfile(data: Partial<IUser>,id:string) {
    try {
      const { morningMotivation, name } = data;
      const user = await this.userRepo.findById(id)
      if(!user) return {success:false,message:STATUS.UNAUTHORIZED.message}
      let updateProfile: Partial<IUser> = {};
      if(name != undefined){
        updateProfile.name = name;
        updateProfile.avatar = name.charAt(0).toUpperCase() 
      }
      if(morningMotivation !== undefined){
        updateProfile.morningMotivation = morningMotivation
      }
     const updatedUser= await this.userRepo.update(id,updateProfile)
      return {success:true,updatedUser}
    } catch (error) {
        return {success:false,message:(error as Error).message}
    }
  }
}