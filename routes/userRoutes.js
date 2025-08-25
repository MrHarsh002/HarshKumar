import express from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/verify/:code', verifyUser);
userRouter.post('/login', loginUser);

export default userRouter;