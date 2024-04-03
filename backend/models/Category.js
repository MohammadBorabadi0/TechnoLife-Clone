import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    brand: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
    ],
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
