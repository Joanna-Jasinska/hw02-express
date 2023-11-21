import mongoose, { SchemaTypes } from "mongoose";

export const Contact = mongoose.model("contact", {
  name: { type: String, required: [true, "Set name for contact"] },
  phone: { type: String },
  email: { type: String }, //, unique: true
  favorite: { type: Boolean, default: false },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: [true, "User not defined"],
  },
});
