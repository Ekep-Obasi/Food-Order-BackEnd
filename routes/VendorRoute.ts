import express, { Request, Response, NextFunction } from "express";
import {UpdateVendorService, 
  GetVendorProfile,
  UpdateVendorProfile,
  VendorLogin,
} from "../controller";
import { Authenticate } from "../middleware/CommonAuth";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from Vendor");
});

router.post("/login", VendorLogin);

// routes that need authentication
router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

export { router as vendorRouter };
