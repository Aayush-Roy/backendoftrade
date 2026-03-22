import { Router } from "express";
import { getOrders } from "../controllers/orderHistory.controller.js";
import { verifyToken } from "../middleware/auth.midddleware.js";

const router = Router();

router.get("/",verifyToken,getOrders);

export default router;