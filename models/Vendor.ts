import mongoose, { Document, Schema, Model } from "mongoose";

interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailalble: boolean;
  coverImage: [string];
  rating: number;
  // food: any;
}

const VendorSchema = new Schema(
  {
    ownerName: { type: String, require: true },
    foodType: { type: [String], require: true },
    pincode: { type: String, require: true },
    address: { type: String },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },
    serviceAvailalble: { type: Boolean },
    coverImage: { type: [String], require: true },
    rating: { type: Number },
    // food: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "food",
    // },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

export const Vendor = mongoose.model("vendor", VendorSchema);
