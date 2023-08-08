import jwt from "jsonwebtoken";
import { VendorPayload } from "../dto";
import { JWT_SECRETE_KEY } from "../config";

export const GenerateToken = async (payload: VendorPayload) => {
  return await jwt.sign(payload, JWT_SECRETE_KEY, { expiresIn: "1d" });
};

export const ValidateToken = async (token: string) => {
  return await jwt.verify(token, JWT_SECRETE_KEY);
};
