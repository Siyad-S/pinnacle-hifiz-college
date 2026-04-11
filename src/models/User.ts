import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  role: "USER" | "ADMIN";
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
