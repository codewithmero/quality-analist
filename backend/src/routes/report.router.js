import express from 'express';
import {
  getAllReports,
  createNewReport,
  getAllReportsByLoggedInUser,
  getReportsBySearchTerm
} from "../controllers/report.controllers.js";
import categoryRoutes from "./category.router.js";
import fileUpload from '../middlewares/multer.middleware.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/")
  .get(checkAuth, getAllReports)
  .post(checkAuth, fileUpload.single('report-img'), createNewReport);

router.route("/search/:searchTerm")
  .get(checkAuth, getReportsBySearchTerm);

router.route("/home")
  .get(checkAuth, getAllReportsByLoggedInUser);

router.use("/category", categoryRoutes);

export default router;