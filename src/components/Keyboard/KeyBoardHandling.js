import React, { useEffect, useState } from 'react';
import produce from 'immer';

import useSiteContext from '../SiteContext';
import lettersList from '../../lib/lettersList';

const KeyboardContext = React.createContext();

const KeyBoardHandling = ({ children }) => {
  const { workingRow, workingBox, solved, letters, setLetters, setWorkingBox, logAnswer, disabled } = useSiteContext();

  const [specialKey, setSpecialKey] = useState(false);

  const backspace = () => {
    if (!disabled) {
      if (letters[workingRow][workingBox] && !solved) {
        const newLetters = produce(letters, draft => {
          draft[workingRow][workingBox] = '';
        });
        setLetters(newLetters);
      } else if (workingBox > 0 && !solved) {
        const newLetters = produce(letters, draft => {
          draft[workingRow][workingBox - 1] = '';
        });
        setLetters(newLetters);
        const newWorkingBox = workingBox - 1;

        setWorkingBox(newWorkingBox);
      }
    }
  };

  const setNextLetter = key => {
    if (!disabled) {
      if (workingBox < 5) {
        const newLetters = produce(letters, draft => {
          draft[workingRow][workingBox] = key;
        });

        setLetters(newLetters);
        const newWorkingBox = workingBox === 5 ? 5 : workingBox + 1;
        setWorkingBox(newWorkingBox);
      }
    }
  };

  const specialKeyUpHandler = e => {
    if (!disabled) {
      if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control') {
        setSpecialKey(false);
        window.removeEventListener('keyup', specialKeyUpHandler);
      }
    }
  };

  function moveCursor(key) {
    const rowLetters = letters[workingRow];
    const lastLetter = rowLetters[4] ? 4 : rowLetters[3] ? 3 : rowLetters[2] ? 2 : rowLetters[1] ? 1 : rowLetters[0] ? 0 : false;
    if (key === 'ArrowLeft' && workingBox > 0) {
      setWorkingBox(workingBox - 1);
    }
    if (key === 'ArrowRight' && workingBox < 4 && lastLetter > workingBox - 1) {
      setWorkingBox(workingBox + 1);
    }
  }

  const keypressHandler = e => {
    if (!disabled) {
      if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control') {
        setSpecialKey(true);
        window.addEventListener('keyup', specialKeyUpHandler);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        moveCursor(e.key);
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (specialKey) {
        return;
      } else if (lettersList.includes(e.key)) {
        setNextLetter(e.key.toLowerCase());
      } else if (e.key === 'Enter') {
        logAnswer();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keypressHandler);
    return () => {
      window.removeEventListener('keydown', keypressHandler);
    };
  });

  return <KeyboardContext.Provider value={{ setNextLetter, backspace }}>{children}</KeyboardContext.Provider>;
};

export { KeyboardContext };
export default KeyBoardHandling;
