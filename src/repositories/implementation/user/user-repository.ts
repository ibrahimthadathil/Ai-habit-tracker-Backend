import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IUser } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user";


@Service()
export class UserRepo extends BaseRepository<IUser>{

        constructor(){
            super(UserModel)
        }

        
}