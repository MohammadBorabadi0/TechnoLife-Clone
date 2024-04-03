import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logout,
  updateUser,
} from "../controllers/UserController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/users").get(protect, getAllUsers);
router.route("/user/profile").get(protect, getUserProfile);
router
  .route("/user/:id")
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);
// router.route('/user/:id').get(protect, admin, getUserById);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

export default router;