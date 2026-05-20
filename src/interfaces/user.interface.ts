import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {

  name: string;

  email: string;

  password: string;

  avatar: string;

  morningMotivation: boolean;

  comparePassword(
    password: string
  ): Promise<boolean>;
}

export interface AuthRequest extends Request {
    user?: IUser
}
