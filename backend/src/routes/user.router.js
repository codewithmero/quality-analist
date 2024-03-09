import express from 'express';
import {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  loginUser,
  logoutUser
} from "../controllers/user.controllers.js";
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/")
  .get(checkAuth, getAllUsers)
  .post(checkAuth, createNewUser);

router.route("/edit/:userId")
  .get(getUserById)
  .patch(updateUserById);

router.route("/login")
  .post(loginUser);

router.route("/logout")
  .post(checkAuth, logoutUser);

export default router;