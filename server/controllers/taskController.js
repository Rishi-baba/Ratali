import Task from "../models/Task.js";
import User from "../models/User.js";
import resetDailyStats from "../utils/resetDailyStats.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, category, taskType, bambooReward, dueDate, repeatFrequency } = req.body;
    const user = await User.findById(req.user._id);
    await resetDailyStats(user);

    const task = await Task.create({
      createdBy: req.user._id,
      title,
      description,
      category,
      taskType,
      bambooReward: bambooReward || 0,
      dueDate,
      repeatFrequency
    });

    user.dailyStats.totalTasks += 1;
    await user.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { filter } = req.query; // all, today, daily, repeated, completed, pending, miniTasks
    let query = { createdBy: req.user._id };

    if (filter === "today") query.taskType = "today";
    else if (filter === "daily") query.taskType = "daily";
    else if (filter === "repeated") query.taskType = "repeated";
    else if (filter === "completed") query.completed = true;
    else if (filter === "pending") query.completed = false;
    else if (filter === "miniTasks") query["miniTasks.0"] = { $exists: true };

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    const user = await User.findById(req.user._id);
    await resetDailyStats(user);

    res.status(200).json({
      tasks,
      taskCounts: {
        total: user.dailyStats.totalTasks,
        completed: user.dailyStats.completedTasks
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeadlines = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      createdBy: req.user._id,
      dueDate: { $gte: today },
      completed: false
    }).sort({ dueDate: 1 }).limit(5);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodayTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id, taskType: "today" }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id, taskType: "daily" }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRepeatedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id, taskType: "repeated" }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
    if (task.completed) return res.status(400).json({ message: "Task already completed" });

    const user = await User.findById(req.user._id);
    await resetDailyStats(user);

    task.completed = true;
    await task.save();

    user.dailyStats.completedTasks += 1;
    
    let reward = 0;
    if (task.taskType === "today") {
      const pendingTodayTasks = await Task.countDocuments({ createdBy: user._id, taskType: "today", completed: false });
      const remainingPool = 100 - user.claimedBambooToday;
      if (remainingPool > 0) {
        reward = Math.floor(remainingPool / Math.max(pendingTodayTasks + 1, 5));
      }
      user.claimedBambooToday += reward;
    }
    user.bamboo += reward;

    // Check for today's task completion streak and bonus
    const todayTasks = await Task.find({ createdBy: user._id, taskType: "today" });
    const allTodayCompleted = todayTasks.length > 0 && todayTasks.every(t => t.completed);
    if (allTodayCompleted) {
      const today = new Date().toDateString();
      const lastUpdate = user.lastStreakUpdate ? new Date(user.lastStreakUpdate).toDateString() : null;
      if (today !== lastUpdate) {
        user.streak += 1;
        user.bamboo += 20; // bonus
        user.lastStreakUpdate = new Date();
      }
    }

    await user.save();

    res.status(200).json({
      message: "Task completed 🐼",
      task,
      reward,
      bamboo: user.bamboo,
      completedTasks: user.dailyStats.completedTasks,
      totalTasks: user.dailyStats.totalTasks,
      streak: user.streak,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    const user = await User.findById(req.user._id);
    await resetDailyStats(user);

    if (!task.completed) {
      user.dailyStats.totalTasks = Math.max(0, user.dailyStats.totalTasks - 1);
    }
    await user.save();
    await task.deleteOne();

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMiniTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
    if (task.taskType !== "today") return res.status(400).json({ message: "Mini tasks can only be added to today tasks" });

    const { title, timerDuration } = req.body;
    task.miniTasks.push({ title, timerDuration: timerDuration || 0 });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeMiniTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    const miniTask = task.miniTasks.id(req.params.miniId);
    if (!miniTask) return res.status(404).json({ message: "Mini task not found" });

    miniTask.completed = !miniTask.completed;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMiniTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    task.miniTasks.pull(req.params.miniId);
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const startTimer = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    const miniTask = task.miniTasks.id(req.params.miniId);
    if (!miniTask) return res.status(404).json({ message: "Mini task not found" });

    miniTask.timerActive = true;
    miniTask.timerStartedAt = new Date();
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const extendTimer = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    const miniTask = task.miniTasks.id(req.params.miniId);
    if (!miniTask) return res.status(404).json({ message: "Mini task not found" });

    const { extraMinutes } = req.body;
    miniTask.timerDuration += (extraMinutes || 5);
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const stopTimer = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    const miniTask = task.miniTasks.id(req.params.miniId);
    if (!miniTask) return res.status(404).json({ message: "Mini task not found" });

    miniTask.timerActive = false;
    miniTask.timerCompleted = true;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};