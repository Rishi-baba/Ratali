import express from "express";
import protect from "../middleware/authMiddleware.js";
import { feedPanda, getUser, performAction } from "../controllers/userController.js";

const router = express.Router();

router.post("/feed", protect, feedPanda);
router.post("/action", protect, performAction);
router.get("/me", protect, getUser);

export default router;
