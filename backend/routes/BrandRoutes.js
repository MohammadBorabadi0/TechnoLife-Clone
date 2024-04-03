import express from "express";

const router = express.Router();
import {
  getBrands,
  createBrand,
  deleteBrand,
  getBrandById,
  updateBrand,
} from "../controllers/BrandController.js";

router.route("/").get(getBrands).post(createBrand);
router.route("/:id").delete(deleteBrand).get(getBrandById).put(updateBrand);

export default router;
