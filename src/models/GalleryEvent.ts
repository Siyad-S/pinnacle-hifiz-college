import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryEvent extends Document {
  imageUrl: string;
  publicId: string;
  title?: string;
  description?: string;
  time?: string;
  venue?: string;
}

const GalleryEventSchema: Schema = new Schema(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    time: { type: String },
    venue: { type: String },
  },
  { timestamps: true }
);

export const GalleryEvent = mongoose.models.GalleryEvent || mongoose.model<IGalleryEvent>("GalleryEvent", GalleryEventSchema);
