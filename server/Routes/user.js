import { Router } from "express";
import { singUp, login } from "../controler/user.js";
import { catchAsync } from "../middleware/index.js";

export const UserRouter = Router();

UserRouter.post("/signup", catchAsync(singUp));
UserRouter.post("/login", catchAsync(login));
