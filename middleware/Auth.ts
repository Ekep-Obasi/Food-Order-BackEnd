import { Request } from "express";
import { ValidateToken } from "../utility";
import { AuthPayload } from "../dto";

export const AuthMiddleWare = async (req: Request) => {
  const AuthorizationHeader = req.header("Authorization");

  const token = AuthorizationHeader?.replace("Bearer: ", "");

  if (token) {
    const payload = await ValidateToken(token);

    req.user = payload as AuthPayload;

    return true;
  }
  return false;
};
