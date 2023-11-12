import mongoose, { Schema } from "mongoose";
// import { User } from "./user.js";
// import { contactSchema } from "../validators/contact";

export const Contact = mongoose.model("contact", {
  name: { type: String, required: [true, "Set name for contact"] },
  phone: { type: String },
  email: { type: String }, //, unique: true
  favorite: { type: Boolean, default: false },
  owner: {
    // !!!AAA!!! next line might not work
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
