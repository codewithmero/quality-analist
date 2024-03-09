import express from 'express';
import {
  getAllCategories,
  createNewCategory
} from "../controllers/category.controllers.js";
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/")
  .get(checkAuth, getAllCategories)
  .post(checkAuth, createNewCategory);

export default router;