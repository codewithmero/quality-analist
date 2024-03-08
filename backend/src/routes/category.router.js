import express from 'express';
import {
  getAllCategories,
  createNewCategory
} from "../controllers/category.controllers.js";

const router = express.Router();

router.route("/")
  .get(getAllCategories)
  .post(createNewCategory);

export default router;