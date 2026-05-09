const resetDailyStats = async (user) => {

  const today = new Date().toDateString();

  const lastReset = new Date(
    user.lastTaskReset
  ).toDateString();

  // new day
  if (today !== lastReset) {

    user.dailyStats.totalTasks = 0;

    user.dailyStats.completedTasks = 0;

    user.lastTaskReset = new Date();

    await user.save();
  }
};

export default resetDailyStats;