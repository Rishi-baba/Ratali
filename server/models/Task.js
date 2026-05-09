import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },

    reward: {
      type: Number,
      default: 10,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    subTasks: [subTaskSchema],

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;