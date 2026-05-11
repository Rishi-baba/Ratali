import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  getDeadlines,
  getTodayTasks,
  getDailyTasks,
  getRepeatedTasks,
  updateTask,
  completeTask,
  deleteTask,
  addMiniTask,
  completeMiniTask,
  deleteMiniTask,
  startTimer,
  extendTimer,
  stopTimer,
} from "../controllers/taskController.js";

const router = express.Router();

// MAIN TASK ROUTES
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/deadlines", protect, getDeadlines);
router.get("/today", protect, getTodayTasks);
router.get("/daily", protect, getDailyTasks);
router.get("/repeated", protect, getRepeatedTasks);
router.put("/:id", protect, updateTask);
router.put("/:id/complete", protect, completeTask);
router.delete("/:id", protect, deleteTask);

// MINI TASK ROUTES
router.post("/:id/mini", protect, addMiniTask);
router.put("/:id/mini/:miniId/complete", protect, completeMiniTask);
router.delete("/:id/mini/:miniId", protect, deleteMiniTask);

// TIMER ROUTES
router.put("/:id/mini/:miniId/timer/start", protect, startTimer);
router.put("/:id/mini/:miniId/timer/extend", protect, extendTimer);
router.put("/:id/mini/:miniId/timer/stop", protect, stopTimer);

export default router;