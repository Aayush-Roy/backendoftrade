import { Router } from "express";
import { getAllHoldings} from "../controllers/main.controller.js";
import { verifyToken } from "../middleware/auth.midddleware.js";
const router = Router();

router.get("/",verifyToken,getAllHoldings);

export default router;