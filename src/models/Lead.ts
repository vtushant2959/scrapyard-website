import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  scrapType: string;
  message: string;
  status: "New" | "Contacted" | "Scheduled" | "Completed" | "Cancelled";
  source: "website" | "whatsapp" | "call" | "app";
  notes: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name:         { type: String, required: true, trim: true },
    phone:        { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true, lowercase: true },
    city:         { type: String, required: true, trim: true },
    businessType: { type: String, default: "" },
    scrapType:    { type: String, default: "" },
    message:      { type: String, default: "" },
    status:       { type: String, enum: ["New", "Contacted", "Scheduled", "Completed", "Cancelled"], default: "New" },
    source:       { type: String, enum: ["website", "whatsapp", "call", "app"], default: "website" },
    notes:        { type: String, default: "" },
    assignedTo:   { type: String, default: "" },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ city: 1 });

export const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>("Lead", LeadSchema);
