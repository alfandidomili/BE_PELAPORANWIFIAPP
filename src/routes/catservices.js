import { Router } from "express";
import { getCServices } from "../controllers/categoriesservicecontroller.js";
const catServiceRouter = Router();

catServiceRouter.get("/catservice", getCServices);

export default catServiceRouter;
