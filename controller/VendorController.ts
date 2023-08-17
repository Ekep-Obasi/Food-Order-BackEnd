import { Request, Response, NextFunction } from "express";
import { CreateFoodInput, EditVendorInputs, LoginVendorInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateToken, ValidatePassword } from "../utility";
import { Food } from "../models";

export const VendorLogin = async (req:Request, res:Response, next:NextFunction) => {
  
  const { email, password } = <LoginVendorInputs>req.body;

  const existingVendor = await FindVendor('', email); // Verify if there exitst a vendor with such email

  if(existingVendor !== null ){

    const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

    if(validation) {

      const token = await GenerateToken({ 
        _id: existingVendor.id,
        name: existingVendor.name, 
        email: existingVendor.email,
        foodType: existingVendor.foodType,
       })

      return res.json(token);
    }
    else {
      return res.json({ message: "Password is not valid" });
    }
  }

  return res.json({ message: "Login credentials not valid"});
}

export const GetVendorProfile = async (req:Request, res:Response, next:NextFunction) => {
  
  const user = req.user;

    if(user) {
      const existingVendor = await FindVendor(user._id);

      return  res.json(existingVendor);
    }

    return res.json({ message: "Vendor information not found"});  
}

export const UpdateVendorProfile = async (req:Request, res:Response, next:NextFunction) => {

  const {name, phone, address, foodType} = <EditVendorInputs>req.body;

  const user = req.user;

    if(user) {
      const existingVendor = await FindVendor(user._id);

      if(existingVendor !== null) {
        existingVendor.name = name;
        existingVendor.phone = phone;
        existingVendor.address = address;
        existingVendor.foodType = foodType;

        const updatedVendorProfile = await existingVendor.save();
        res.json(updatedVendorProfile)
      }

      return  res.json(existingVendor);
    }

    return res.json({ message: "Vendor information not found"});
}

export const UpdateVendorService = async (req:Request, res:Response, next:NextFunction) => {
  
  const user = req.user;

    if(user) {
      const existingVendor = await FindVendor(user._id);

      if(existingVendor !== null) {

        existingVendor.serviceAvailalble = !existingVendor.serviceAvailalble;

        const updatedVendorService = await existingVendor.save();

        return res.json(updatedVendorService);
      }

      return  res.json(existingVendor);
    }

    return res.json({ message: "Vendor information not found"});
}

export const AddFood = async (req:Request, res:Response, next:NextFunction) => {
  
  const user = req.user;
  const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;

    if(user) {

      const vendor = await FindVendor(user._id);

      if( vendor !== null ) {

        const createdFood = await Food.create({
          vendorID: vendor._id,
          name, 
          description, 
          category, 
          foodType,
          images: ['node.jpeg'],
          readyTime, 
          price,
          rating: 0,
          food: []
        });

        vendor.food.push(createdFood)
        
       const updatedVendor = await vendor.save();

        res.json(updatedVendor);
      }

    }

    return res.json({ message: "Vendor information not found"});
}

export const GetFood = async (req:Request, res:Response, next:NextFunction) => {
  
  const user = req.user;

    if(user) {
      const existingVendor = await FindVendor(user._id);

      if(existingVendor !== null) {

      }

      return  res.json(existingVendor);
    }

    return res.json({ message: "Vendor information not found"});
}