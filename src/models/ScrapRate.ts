import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScrapRate extends Document {
  name: string;
  category: "Metal" | "Plastic" | "Paper" | "Electronics" | "Industrial" | "Other";
  rate: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  isActive: boolean;
  sortOrder: number;
  notes: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ScrapRateSchema = new Schema<IScrapRate>(
  {
    name:      { type: String, required: true, trim: true },
    category:  { type: String, required: true, enum: ["Metal", "Plastic", "Paper", "Electronics", "Industrial", "Other"] },
    rate:      { type: Number, required: true, min: 0 },
    unit:      { type: String, default: "kg" },
    change:    { type: Number, default: 0 },
    trend:     { type: String, enum: ["up", "down", "stable"], default: "stable" },
    isActive:  { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    notes:     { type: String, default: "" },
    updatedBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

ScrapRateSchema.index({ category: 1, isActive: 1 });

export const ScrapRate: Model<IScrapRate> =
  mongoose.models.ScrapRate ?? mongoose.model<IScrapRate>("ScrapRate", ScrapRateSchema);
