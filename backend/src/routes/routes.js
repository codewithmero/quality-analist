import express from 'express';
import reportRoutes from "./report.router.js";
import userRoutes from "./user.router.js";
const appRouter = express.Router();

appRouter.use("/reports", reportRoutes);
appRouter.use("/users", userRoutes);

export default appRouter;