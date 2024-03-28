import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto";
import { AuthMiddleWare } from "./Auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async(req:Request, res:Response, next:NextFunction) => {
  const validate = await AuthMiddleWare(req);

  if(validate) {
    next();
  }else {
    res.json({ "message": "user not Authorized"});
  }
}