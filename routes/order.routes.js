import { Router } from "express";
import { buyStock, sellStock } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.midddleware.js";

const router = Router();

router.post("/buy",verifyToken,buyStock);
router.post("/sell",verifyToken,sellStock);

export default router;