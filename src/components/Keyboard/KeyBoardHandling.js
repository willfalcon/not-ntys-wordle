import React, { useEffect, useState } from 'react';
import produce from 'immer';

import useSiteContext from '../SiteContext';
import lettersList from '../lettersList';

const KeyboardContext = React.createContext();

const KeyBoardHandling = ({ children }) => {
  const { workingRow, workingBox, solved, letters, setLetters, setWorkingBox, logAnswer } = useSiteContext();

  const [specialKey, setSpecialKey] = useState(false);

  const backspace = () => {
    if (workingBox !== 0 && !solved) {
      const newLetters = produce(letters, draft => {
        draft[workingRow][workingBox - 1] = '';
      });
      setLetters(newLetters);
      const newWorkingBox = workingBox - 1;

      setWorkingBox(newWorkingBox);
    }
  };

  const setNextLetter = key => {
    if (workingBox !== 5) {
      const newLetters = produce(letters, draft => {
        draft[workingRow][workingBox] = key;
      });

      setLetters(newLetters);
      const newWorkingBox = workingBox == 5 ? 5 : workingBox + 1;
      setWorkingBox(newWorkingBox);
    }
  };

  const specialKeyUpHandler = e => {
    if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control') {
      setSpecialKey(false);
      window.removeEventListener('keyup', specialKeyUpHandler);
    }
  };

  const keypressHandler = e => {
    if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control') {
      setSpecialKey(true);
      window.addEventListener('keyup', specialKeyUpHandler);
    } else if (e.key === 'Backspace') {
      backspace();
    } else if (specialKey) {
      return;
    } else if (lettersList.includes(e.key)) {
      setNextLetter(e.key.toLowerCase());
    } else if (e.key === 'Enter') {
      logAnswer();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keypressHandler);
    return () => {
      window.removeEventListener('keydown', keypressHandler);
    };
  }, [workingRow, workingBox, specialKey]);

  return <KeyboardContext.Provider value={{ setNextLetter, backspace }}>{children}</KeyboardContext.Provider>;
};

export { KeyboardContext };
export default KeyBoardHandling;
