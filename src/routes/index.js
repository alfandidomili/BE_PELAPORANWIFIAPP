import { Router } from "express";
import userRouter from "./userroutes.js";
import orderrouter from "./orderroutes.js";
import evideRouter from "./evidenRouter.js";
import catServiceRouter from "./catservices.js";
import catStatusOrderRouter from "./catstatusorder.js";
import statusEviden from "./statusEviden.js";

const router = Router();

// router.use("/api", userRolesRouter)
router.use("/api", userRouter);
router.use("/api", orderrouter);
router.use("/api", catServiceRouter);
router.use("/api", catStatusOrderRouter);
router.use("/api", evideRouter);
router.use("/api", statusEviden);

router.use("*", (req, res) => {
   res.status(404).send({ messages: "not found YACH" });
});

export default router;
