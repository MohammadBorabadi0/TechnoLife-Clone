import express from "express";
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  deleteAllBanners,
} from "../controllers/BannerController.js";
import saveImageMiddleware from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBanners)
  .post(saveImageMiddleware, createBanner)
  .delete(deleteAllBanners);
router.route("/:id").delete(deleteBanner);
// router.route("/:id").delete(deleteBrand).get(getBrandById).put(updateBrand);

export default router;
