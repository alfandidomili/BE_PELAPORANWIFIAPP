import { Router } from "express";
import { getCatStatEviden } from "../controllers/statusEvidenController.js";
const statusEviden = Router();

statusEviden.get("/cateviden", getCatStatEviden);

export default statusEviden;
