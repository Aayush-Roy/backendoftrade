import { Router } from "express";
import { getAllPositions} from "../controllers/main.controller.js";
const router = Router();
import { verifyToken } from "../middleware/auth.midddleware.js";
router.get("/",verifyToken,getAllPositions);

export default router;