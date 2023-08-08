import express, { Request, Response, NextFunction } from "express";
import { CreateVendor } from "../controller";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from Vendor");
});

router.post("/", CreateVendor);

export { router as vendorRouter };
