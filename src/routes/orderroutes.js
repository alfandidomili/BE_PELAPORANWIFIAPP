import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
   deleteOrderAdmin,
   getOrder,
   getOrderById,
   insertOrder,
   updateOrder,
} from "../controllers/ordercontroller.js";
const order = Router();

order.get("/order", getOrder);
order.post("/order/create", insertOrder);
order.put("/order/update/:idOrder", updateOrder);
order.get("/order/:idOrder", getOrderById);
order.delete("/order/:idOrder", deleteOrderAdmin);

export default order;
