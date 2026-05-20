import { STATUS } from "@/const/httpStatus";
import { AuthRequest } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
      return res
        .status(STATUS.UNAUTHORIZED.code)
        .json({ message: STATUS.UNAUTHORIZED.message });
    const decode = jwt.verify(token, process.env.JWT_SECTET_KEY as string) as JwtPayload;
    const user = await UserModel.findById(decode.id) ;
    if (!user)
      return res
        .status(STATUS.UNAUTHORIZED.code)
        .json({ message: STATUS.UNAUTHORIZED.message });
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(STATUS.UNAUTHORIZED.code)
      .json({ message: STATUS.UNAUTHORIZED.message });
  }
};
