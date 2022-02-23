import { useLocalStorage } from './hooks';
import produce from 'immer';

function useKeyStatuses(word) {
  const [keyStatuses, setKeyStatuses] = useLocalStorage('keyStatus', []);

  function figureOutKeyStatuses(attempt) {
    const newKeyStatuses = produce(keyStatuses, draft => {
      // Going through each letter in the attempt
      draft.push(
        attempt.map((letter, index) => {
          function getStatus() {
            // How many times is this letter in the word?
            const letterCount = word.split('').filter(key => key === letter).length;
            if (letterCount === 0) {
              // If it's not in the word, return wrong;
              return 'wrong';
            }
            if (letterCount === 1) {
              // If it's in the word once, return correct if in the right spot, kinda if not.
              if (word.split('').indexOf(letter) === index) {
                return 'correct';
              }
              return 'kinda';
            }
            if (letterCount > 1) {
              // if there are more letters, did we get them all?

              const correctArray = word.split('');

              const statuses = attempt.map((letter, index) => {
                return {
                  index,
                  status: correctArray[index] === letter ? 'correct' : correctArray.includes(letter) ? 'kinda' : 'wrong',
                  letter: letter,
                  correctLetter: correctArray[index],
                };
              });

              const thisLetterInWord = statuses.filter(status => status.correctLetter === letter);
              const thisLetterInWordStatuses = thisLetterInWord.map(status => status.status);
              if (thisLetterInWordStatuses.includes('wrong') || thisLetterInWordStatuses.includes('kinda')) {
                return 'kinda';
              } else {
                return 'correct';
              }
            }
          }
          return {
            key: letter,
            status: getStatus(),
          };
        })
      );
    });
    setKeyStatuses(newKeyStatuses);
  }

  return { keyStatuses, figureOutKeyStatuses, setKeyStatuses };
}

export default useKeyStatuses;
