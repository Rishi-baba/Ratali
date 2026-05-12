import User from "../models/User.js";
import resetDailyStats from "../utils/resetDailyStats.js";

export const feedPanda = async (req, res) => {
  try {
    const { healthAmount, cost } = req.body;
    const user = await User.findById(req.user._id);
    await resetDailyStats(user);
    
    if (user.pandaDead) return res.status(400).json({ message: "Panda is dead. Revive it first!" });
    if (user.bamboo < cost) return res.status(400).json({ message: "Not enough bamboo!" });

    user.bamboo -= cost;
    user.pandaHealth = Math.min(100, user.pandaHealth + healthAmount);
    user.totalHealthFed += healthAmount;
    user.pandaLevel = 1 + Math.floor(user.totalHealthFed / 500);
    
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const performAction = async (req, res) => {
  try {
    const { action, cost, healthAmount } = req.body; // action: 'bath', 'nap', 'revive', 'chill'
    const user = await User.findById(req.user._id);
    await resetDailyStats(user);

    if (action === "revive") {
      if (user.bamboo < 500) return res.status(400).json({ message: "Not enough bamboo 🐼" });
      user.bamboo -= 500;
      user.pandaHealth = 50;
      user.pandaDead = false;
      await user.save();
      return res.status(200).json(user);
    }

    if (user.pandaDead) return res.status(400).json({ message: "Panda is dead. Revive it first!" });

    if (user.bamboo < cost) return res.status(400).json({ message: "Not enough bamboo 🐼" });

    if (action === "bath") {
      if (user.bathDoneToday) return res.status(400).json({ message: "Bath already done today!" });
      user.bathDoneToday = true;
    } else if (action === "nap") {
      if (user.napDoneToday) return res.status(400).json({ message: "Nap already done today!" });
      user.napDoneToday = true;
    } else if (action === "maggie") {
      user.foodInventory.maggie = (user.foodInventory.maggie || 0) + 1;
    } else if (action === "momos") {
      user.foodInventory.momos = (user.foodInventory.momos || 0) + 1;
    } else if (action === "pizzaEat") {
      user.foodInventory.pizza = (user.foodInventory.pizza || 0) + 1;
    }

    user.bamboo -= cost;
    if (healthAmount) {
      user.pandaHealth = Math.min(100, user.pandaHealth + healthAmount);
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    await resetDailyStats(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
