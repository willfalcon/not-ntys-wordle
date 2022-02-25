async function checkWord(attemptStr, word) {
  const raw = await fetch(`/.netlify/functions/word-exists?word=${attemptStr}`);
  const found = await raw.json();
  if (!found || !word) {
    return {
      found,
    };
  }

  const correctArray = word.split('');
  const attempt = attemptStr.split('');

  const reference = attempt.map((letter, index) => ({
    attempt: letter,
    index,
    correct: correctArray[index],
    status: correctArray[index] === letter ? 'correct' : correctArray.includes(letter) ? 'kinda' : 'wrong',
  }));

  const result = reference.map((letter, index) => {
    // if this is the right letter in the right spot, return correct regardless
    if (letter.status === 'correct') {
      return 'correct';
    }
    // if this is a right letter in the wrong spot,
    if (letter.status === 'kinda') {
      // if this is a correct letter in the wrong spot, but all the correct instances are account for, return false
      if (!reference.filter(ref => ref.correct === letter.attempt && ref.status !== 'correct').length) {
        // what witchcraft is this?
        return 'wrong';
      }

      return 'kinda';
    } else {
      return 'wrong';
    }
  });

  const solved = result.filter(status => status !== 'correct');

  return { result, solved: !solved.length, found };
}

export default checkWord;
