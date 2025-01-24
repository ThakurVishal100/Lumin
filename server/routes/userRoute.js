import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// console.log(express);

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);

export default router;
