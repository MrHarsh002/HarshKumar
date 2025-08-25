import express from "express";
import dotenv from "dotenv";
import dbConnect from './config/dbConfig.js'
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("All Working Fine")
})

dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})