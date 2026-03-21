import dotenv from "dotenv";
import express from "express";
import { prisma } from "./lib/prisma.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`app listening on ${PORT}`)
})