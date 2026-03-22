import { Router } from "express";
import {
 addToWatchlist,
 getWatchlist,
 deleteFromWatchlist
} from "../controllers/watchlist.controller.js";

import { verifyToken } from "../middleware/auth.midddleware.js";

const router = Router();

router.get("/",getWatchlist);

router.post("/",verifyToken,addToWatchlist);

router.delete("/:id",verifyToken,deleteFromWatchlist);

export default router;