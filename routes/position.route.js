import { Router } from "express";
import { getAllPositions} from "../controllers/main.controller.js";
const router = Router();

router.get("/",getAllPositions);

export default router;