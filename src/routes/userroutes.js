import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
   getMe,
   getUsers,
   getUsersMitra,
   loginUsers,
   logoutUsers,
   registUser,
} from "../controllers/usercontroller.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/mitra", getUsersMitra);
userRouter.get("/me", verifyToken, getMe);
userRouter.post("/register", registUser);
userRouter.post("/login", loginUsers);
userRouter.post("/users/logout", logoutUsers);
userRouter.get("/protected", verifyToken, (req, res) => {
   res.json({
      message: "Endpoint ini memerlukan token untuk akses",
      user: req.user,
   });
});

export default userRouter;
