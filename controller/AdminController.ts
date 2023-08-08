import express, { Request, Response, NextFunction } from "express";

import { Vendor } from "../models";
import { GenerateSalt, GeneratedHashedPassword } from "../utility";
import { CreateVendorInputs } from "../dto";

// not a controller
export const FindVendor = async (id: string | undefined, email?: string) => {
  if(email) {
    return await Vendor.findOne({ email: email });
  }
  else {
   return await Vendor.findById(id);
  }
}

export const CreateVendor = async ( req: Request, res: Response, next: NextFunction ) => {
  
  const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVendorInputs>req.body;

  const existingVendor = await FindVendor('', email) // Verifying if a user already exists to avoid duplicates

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

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
  const vendors = await Vendor.find();
  
  if(vendors !== null) {
    return res.json(vendors);
  }

  return res.json({ message: "Cannot get vendor data" });
};

export const GetVendorByID = async ( req: Request, res: Response, next: NextFunction ) => {
  const vendorID = req.params.id;

  const vendor = await FindVendor(vendorID);

  if(vendor !== null) return res.json(vendor);

  return res.json({ message: "Cannot get vendor data" });
};
