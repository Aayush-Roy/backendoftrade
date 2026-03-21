import dotenv from "dotenv";
import express from "express";
import holdingRoute from "./routes/holding.route.js"
import positionRoute from "./routes/position.route.js"
import { prisma } from "./lib/prisma.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT
app.use("/api/holdings", holdingRoute);
app.use("/api/positions", positionRoute);

app.listen(PORT,()=>{
    console.log(`app listening on ${PORT}`)
})