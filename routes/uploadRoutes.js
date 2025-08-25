import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import upload from "../config/multer.js";

const fileRouter = express.Router();

fileRouter.post("/", upload.single("image"), uploadFile);

export default fileRouter;
