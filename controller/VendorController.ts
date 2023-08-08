import { Request, Response, NextFunction } from "express";
import { Vendor } from "../models";
import { GenerateSalt, GeneratedHashedPassword } from "../utility";
import { CreateVendorInputs } from "../dto";

export const CreateVendor = async ( req: Request, res: Response, next: NextFunction ) => {
  
  const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVendorInputs>req.body;

  const existingVendor = await Vendor.findOne({ email }); // Verifying if a user already exists to avoid duplicates

  if (existingVendor !== null)
    return res.json({ message: "Already extist in the db" });


    // generate salt & hash password

  const saltRounds = await GenerateSalt();
  const hashedPassword = await GeneratedHashedPassword(password, saltRounds);

  const createdVendor = await Vendor.create({
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password: hashedPassword,
    salt: saltRounds,
    serviceAvailalble: false,
    rating: 0,
    coverImage: [],
    food: [],
  });

  return res.json(createdVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
