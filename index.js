import express from "express";
import dotenv from "dotenv";
import dbConnect from './config/dbConfig.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/',(res, req) => {
    res.send("All Good")
});

dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})