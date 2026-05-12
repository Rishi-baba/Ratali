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

    pandaLevel: {
      type: Number,
      default: 1,
    },

    totalHealthFed: {
      type: Number,
      default: 0,
    },

    lastStreakUpdate: {
      type: Date,
      default: null,
    },

    pandaHealth: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    lastHealthUpdate: {
      type: Date,
      default: Date.now,
    },

    pandaDead: {
      type: Boolean,
      default: false,
    },

    bathDoneToday: {
      type: Boolean,
      default: false,
    },

    napDoneToday: {
      type: Boolean,
      default: false,
    },

    claimedBambooToday: {
      type: Number,
      default: 0,
    },

    foodInventory: {
      pizza: { type: Number, default: 0 },
      momos: { type: Number, default: 0 },
      maggie: { type: Number, default: 0 },
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