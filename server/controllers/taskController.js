import Task from "../models/Task.js";
import User from "../models/User.js";
import resetDailyStats from "../utils/resetDailyStats.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {

    const {
      title,
      type,
      subTasks,
      dueDate,
    } = req.body;

    // find user
    const user = await User.findById(req.user._id);

    // reset if new day
    await resetDailyStats(user);

    // create task
    const task = await Task.create({
      user: req.user._id,
      title,
      type,
      subTasks,
      dueDate,
    });

    // increase daily task count
    user.dailyStats.totalTasks += 1;

    await user.save();

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};





// GET TASKS
export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user._id,
    });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const completeTask = async (req, res) => {
  try {

    // find task
    const task = await Task.findById(req.params.id);

    // task exists?
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // owner check
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // already completed?
    if (task.completed) {
      return res.status(400).json({
        message: "Task already completed",
      });
    }

    // find user
    const user = await User.findById(req.user._id);

    // reset daily stats if needed
    await resetDailyStats(user);

    // mark complete
    task.completed = true;

    await task.save();

    // completed task count
    user.dailyStats.completedTasks += 1;

    // bamboo reward
    const bambooReward = Math.floor(
      100 / user.dailyStats.totalTasks
    );

    // add bamboo
    user.bamboo += bambooReward;

    // panda happy
    user.pandaMood = "happy";

    await user.save();

    res.status(200).json({
      message: "Task completed 🐼",
      reward: bambooReward,
      bamboo: user.bamboo,
      completedTasks: user.dailyStats.completedTasks,
      totalTasks: user.dailyStats.totalTasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELETE TASK
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // owner check
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // find user
    const user = await User.findById(req.user._id);

    // reset if needed
    await resetDailyStats(user);

    // decrease total tasks ONLY if task incomplete
    if (!task.completed) {

      user.dailyStats.totalTasks -= 1;

      // prevent negative values
      if (user.dailyStats.totalTasks < 0) {
        user.dailyStats.totalTasks = 0;
      }
    }

    await user.save();

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};