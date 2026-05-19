import { STATUS } from "@/const/httpStatus";
import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(STATUS.NOT_FOUND.code)
    .json({ message: `${STATUS.NOT_FOUND.message} : ${req.originalUrl}` });
};

export const errorHandler = (
  err:Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  const status =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || "Server Error" });
};
