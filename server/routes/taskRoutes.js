import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id/complete", protect, completeTask);

router.delete("/:id", protect, deleteTask);

export default router;