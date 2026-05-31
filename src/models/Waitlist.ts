import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWaitlist extends Document {
  name: string;
  phone: string;
  email: string;
  city: string;
  userType: string;
  notified: boolean;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    name:     { type: String, required: true, trim: true },
    phone:    { type: String, required: true, trim: true },
    email:    { type: String, required: true, trim: true, lowercase: true },
    city:     { type: String, default: "" },
    userType: { type: String, default: "" },
    notified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

WaitlistSchema.index({ email: 1 }, { unique: true });

export const Waitlist: Model<IWaitlist> =
  mongoose.models.Waitlist ?? mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);
