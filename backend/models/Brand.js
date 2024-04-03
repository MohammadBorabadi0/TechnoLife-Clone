import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);

export default Brand;
