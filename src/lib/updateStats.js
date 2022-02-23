import produce from 'immer';

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

function updateStats(attempts, won, stats, setStats) {
  const usedAttempts = attempts.filter(attempt => !attempt.includes(null));
  const numberAttempts = usedAttempts.length;

  localStorage.setItem('todaysGuesses', numberAttempts);

  const newStats = produce(stats, draft => {
    draft.guesses[numberAttempts]++;
    draft.gamesPlayed++;
    if (won) {
      draft.gamesWon++;
      draft.currentStreak++;
      if (draft.currentStreak > draft.maxStreak) {
        draft.maxStreak = draft.currentStreak;
      }
    } else {
      draft.currentStreak = 0;
    }
  });
  setStats(newStats);
}

export { blankStatsObj };
export default updateStats;
