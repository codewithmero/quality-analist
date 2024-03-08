import express from 'express';
import {
  getAllUsers,
  createNewUser,
  loginUser,
  logoutUser
} from "../controllers/user.controllers.js";
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/")
  .get(getAllUsers)
  .post(createNewUser);

router.route("/login")
  .post(loginUser);

router.route("/logout")
  .post(checkAuth, logoutUser);

export default router;