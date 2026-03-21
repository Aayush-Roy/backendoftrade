import { Router } from "express";
import { getAllHoldings} from "../controllers/main.controller.js";
const router = Router();

router.get("/",getAllHoldings);

export default router;