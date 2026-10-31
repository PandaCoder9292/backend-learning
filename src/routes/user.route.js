import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutuser,
} from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutuser);

export default userRouter;
