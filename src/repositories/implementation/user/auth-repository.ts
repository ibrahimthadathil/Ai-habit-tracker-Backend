import { Service } from "typedi";
import { BaseRepository } from "../base-repository";
import { IUser } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user";


@Service()
export class AuthRepo extends BaseRepository<IUser>{

        constructor(){
            super(UserModel)
        }

        async findone(email:string){
            return await UserModel.findOne({email})
        }
}