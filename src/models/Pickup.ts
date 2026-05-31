import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPickup extends Document {
  leadId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  scheduledDate: Date;
  scheduledSlot: string;
  scrapType: string;
  estimatedWeight: number;
  actualWeight: number;
  actualRate: number;
  totalAmount: number;
  paymentMethod: "upi" | "bank" | "cash";
  paymentStatus: "pending" | "paid";
  status: "Scheduled" | "En Route" | "Arrived" | "Completed" | "Cancelled";
  agentName: string;
  agentPhone: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const PickupSchema = new Schema<IPickup>(
  {
    leadId:          { type: String, default: "" },
    name:            { type: String, required: true },
    phone:           { type: String, required: true },
    address:         { type: String, default: "" },
    city:            { type: String, required: true },
    scheduledDate:   { type: Date },
    scheduledSlot:   { type: String, default: "" },
    scrapType:       { type: String, default: "" },
    estimatedWeight: { type: Number, default: 0 },
    actualWeight:    { type: Number, default: 0 },
    actualRate:      { type: Number, default: 0 },
    totalAmount:     { type: Number, default: 0 },
    paymentMethod:   { type: String, enum: ["upi", "bank", "cash"], default: "upi" },
    paymentStatus:   { type: String, enum: ["pending", "paid"], default: "pending" },
    status:          { type: String, enum: ["Scheduled", "En Route", "Arrived", "Completed", "Cancelled"], default: "Scheduled" },
    agentName:       { type: String, default: "" },
    agentPhone:      { type: String, default: "" },
    notes:           { type: String, default: "" },
  },
  { timestamps: true }
);

PickupSchema.index({ status: 1, scheduledDate: -1 });

export const Pickup: Model<IPickup> =
  mongoose.models.Pickup ?? mongoose.model<IPickup>("Pickup", PickupSchema);
