import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  coverImage: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title:           { type: String, required: true, trim: true },
    slug:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt:         { type: String, default: "" },
    content:         { type: String, default: "" },
    category:        { type: String, default: "General" },
    tags:            [{ type: String }],
    author:          { type: String, default: "SCRAPYARD Team" },
    coverImage:      { type: String, default: "" },
    status:          { type: String, enum: ["draft", "published"], default: "draft" },
    metaTitle:       { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    views:           { type: Number, default: 0 },
  },
  { timestamps: true }
);

BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1, createdAt: -1 });

export const Blog: Model<IBlog> =
  mongoose.models.Blog ?? mongoose.model<IBlog>("Blog", BlogSchema);
