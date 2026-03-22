import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import holdingRoute from "./routes/holding.route.js"
import positionRoute from "./routes/position.route.js"
import authRoutes from "./routes/auth.routes.js";
import { prisma } from "./lib/prisma.js";
import orderRoute from "./routes/order.routes.js";
import watchlistRoute from "./routes/watchlist.route.js";
dotenv.config();
const app = express();
app.use(bodyParser.json())
app.use(cors());

const PORT = process.env.PORT

// const insertWatchList = async()=>{
//     const watchlistData = [
//   { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
//   { name: "ONGC", price: 116.8, percent: "-0.09%", isDown: true },
//   { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
//   { name: "KPITTECH", price: 266.45, percent: "3.54%", isDown: false },
//   { name: "QUICKHEAL", price: 308.55, percent: "-0.15%", isDown: true },
//   { name: "WIPRO", price: 577.75, percent: "0.32%", isDown: false },
//   { name: "M&M", price: 779.8, percent: "-0.01%", isDown: true },
//   { name: "RELIANCE", price: 2112.4, percent: "1.44%", isDown: false },
//   { name: "HUL", price: 512.4, percent: "1.04%", isDown: false },
// ];
// await prisma.watchlist.createMany({
//     data: watchlistData
//   });
//   console.log("watchlist inserted");
// }

// insertWatchList();

app.use("/api/auth", authRoutes);
app.use("/api/holdings", holdingRoute);
app.use("/api/positions", positionRoute);
app.use("/api/orders", orderRoute);
app.use("/api/watchlist",watchlistRoute);
app.listen(PORT,()=>{
    console.log(`app listening on ${PORT}`)
})