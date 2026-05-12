const syncHealth = async (user) => {
  if (user.pandaDead) return;

  const now = new Date();
  const lastUpdate = new Date(user.lastHealthUpdate);
  const timeDiff = now.getTime() - lastUpdate.getTime();

  if (timeDiff > 0) {
    // 100 health decays in 24 hours (24 * 60 * 60 * 1000 ms)
    const decayAmount = timeDiff * (100 / (24 * 60 * 60 * 1000));
    
    user.pandaHealth -= decayAmount;
    if (user.pandaHealth <= 0) {
      user.pandaHealth = 0;
      user.pandaDead = true;
    }
    
    user.lastHealthUpdate = now;
  }
};

export default syncHealth;
