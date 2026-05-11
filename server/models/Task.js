import mongoose from "mongoose";

const miniTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  timerDuration: {
    type: Number,
    default: 0,
  },
  timerStartedAt: {
    type: Date,
    default: null,
  },
  timerActive: {
    type: Boolean,
    default: false,
  },
  timerCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Work", "Study", "Personal", "Health", "Home"],
      default: "Work",
    },
    taskType: {
      type: String,
      enum: ["today", "daily", "repeated"],
      default: "today",
    },
    bambooReward: {
      type: Number,
      default: 5,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    repeatFrequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "daily", "weekly", "monthly"],
    },
    miniTasks: [miniTaskSchema],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;