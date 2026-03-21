import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import holdingRoute from "./routes/holding.route.js"
import positionRoute from "./routes/position.route.js"
dotenv.config();
const app = express();
app.use(bodyParser.json())
app.use(cors());

const PORT = process.env.PORT
app.use("/api/holdings", holdingRoute);
app.use("/api/positions", positionRoute);

app.listen(PORT,()=>{
    console.log(`app listening on ${PORT}`)
})