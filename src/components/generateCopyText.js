import { differenceInDays, setHours, setMinutes, setSeconds } from 'date-fns';

function generateCopyText(attempts) {
  const filteredAttempts = attempts.filter(attempt => !attempt.includes(null));
  const midnight = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
  const edition = differenceInDays(midnight, new Date('2022-02-05'));

  const heading = `Skwahdle ${edition} ${filteredAttempts.length}/6 \n\n`;
  const renderAttempt = attempt => {
    return attempt
      .map(letter => {
        switch (letter) {
          case 'wrong':
          default:
            return '⬜';
          case 'kinda':
            return '🟨';
          case 'correct':
            return '🟩';
        }
      })
      .join('');
  };
  const attemptsCopy = filteredAttempts.map((attempt, index) => renderAttempt(attempt)).join('\n');
  return heading + attemptsCopy;
}

export default generateCopyText;
