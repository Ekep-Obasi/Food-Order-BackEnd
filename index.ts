import express from "express";
import bodyParser from "body-parser";
import { vendorRouter, adminRouter } from "./routes";
import "./config/db";
import dotEnv from "dotenv";

dotEnv.config(); // configure environmental vars


const app = express(); // creating an instance of express app

// extract the body from the request stream
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// defining routes
app.use("/admin", adminRouter);
app.use("/vendor", vendorRouter);

// connnect database

app.listen(8000, () => {
  console.clear();
  console.log("App is listening to port 8000");
});
