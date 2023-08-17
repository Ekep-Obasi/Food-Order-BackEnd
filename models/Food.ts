import mongoose, { Document, Schema } from "mongoose";

export interface FoodDocument extends Document {
  vendorID: string;
  name: string;
  description: string;
  category: string;
  foodType: [string];
  readyTime: number;
  price: number;
  rating: number;
}

const FoodSchema = new Schema(
  {
    vendorID: { type: String },
    name: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    readyTime: { type: Number, require: true },
    foodTypes: { types: [String] },
    price: { type: Number, require: true },
    rating: { type: Number },
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

export const Food = mongoose.model<FoodDocument>("food", FoodSchema);
