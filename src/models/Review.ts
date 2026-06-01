import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  rating: number;
  title: string;
  review: string;
  scrapType: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name:      { type: String, required: true, trim: true },
    email:     { type: String, default: "" },
    phone:     { type: String, default: "" },
    city:      { type: String, default: "" },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    title:     { type: String, default: "" },
    review:    { type: String, required: true },
    scrapType: { type: String, default: "" },
    status:    { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    featured:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

ReviewSchema.index({ status: 1, createdAt: -1 });

export const Review: Model<IReview> =
  mongoose.models.Review ?? mongoose.model<IReview>("Review", ReviewSchema);
