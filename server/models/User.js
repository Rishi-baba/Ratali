import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    bamboo: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },

    pandaMood: {
      type: String,
      default: "happy",
    },

    pandaHunger: {
      type: Number,
      default: 100,
    },
    
    dailyStats: {
      totalTasks: {
        type: Number,
        default: 0,
      },

      completedTasks: {
        type: Number,
        default: 0,
      },
    },

    lastTaskReset: {
      type: Date,
      default: Date.now,
    },

  },

  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema);

export default User;