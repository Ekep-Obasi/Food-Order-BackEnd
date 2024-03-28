import express, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetVendorByID, GetVendors } from "../controller";

const router = express.Router();

router.get('/vendor', GetVendors); // get all vendors
router.get('/vendor/:id', GetVendorByID); // getVendor by id
router.post('/vendor', CreateVendor); // Create vendor

export { router as adminRouter };
