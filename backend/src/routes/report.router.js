import express from 'express';
import {
  getAllReports,
  createNewReport,
  getAllReportsByUserId,
  getReportsBySearchTerm
} from "../controllers/report.controllers.js";
import categoryRoutes from "./category.router.js";
import fileUpload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.route("/")
  .get(getAllReports)
  .post(fileUpload.single('report-img'), createNewReport);

router.route("/search/:searchTerm")
  .get(getReportsBySearchTerm);

router.route("/home/:userId")
  .get(getAllReportsByUserId);

router.use("/category", categoryRoutes);

export default router;