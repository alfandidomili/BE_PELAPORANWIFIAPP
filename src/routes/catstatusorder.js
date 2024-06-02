import { Router } from "express";
import { getCStatusOrder } from "../controllers/statusOrderController.js";
const catStatusOrderRouter = Router();

catStatusOrderRouter.get("/catstatusorder", getCStatusOrder);

export default catStatusOrderRouter;
