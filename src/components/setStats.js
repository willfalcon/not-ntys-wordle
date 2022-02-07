const blankStatsObj = {
  gamesPlayed: 0,
  gamesWon: 0,
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    fail: 0,
  },
  maxStreak: 0,
  currentStreak: 0,
};

function setStats(attempts, won) {
  const statsObj = localStorage.getItem('stats') ? JSON.parse(localStorage.getItem('stats')) : blankStatsObj;

  const usedAttempts = attempts.filter(attempt => !attempt.includes(null));
  const numberAttempts = usedAttempts.length;
  localStorage.setItem('todaysGuesses', numberAttempts);

  statsObj.guesses[numberAttempts]++;
  statsObj.gamesPlayed++;
  if (won) {
    statsObj.gamesWon++;
    statsObj.currentStreak++;
    if (statsObj.currentStreak > statsObj.maxStreak) {
      statsObj.maxStreak = statsObj.currentStreak;
    }
  } else {
    statsObj.currentStreak = 0;
  }

  localStorage.setItem('stats', JSON.stringify(statsObj));
}

export default setStats;
