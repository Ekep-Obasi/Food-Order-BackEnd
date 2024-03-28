import express from "express";
import { UpdateVendorService, GetVendorProfile, UpdateVendorProfile, VendorLogin } from "../controller";
import { Authenticate } from "../middleware/CommonAuth";

const router = express.Router();

router.post("/login", VendorLogin);

// routes that need authentication
router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

router.post("/food");
router.get("/food");

export { router as vendorRouter };
