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
      localStorage.setItem('letters', JSON.stringify(newLetters));
      setLetters(newLetters);
      const newWorkingBox = workingBox - 1;
      localStorage.setItem('workingBox', newWorkingBox);
      setWorkingBox(newWorkingBox);
    }
  };

  const setNextLetter = key => {
    if (workingBox !== 5) {
      const newLetters = produce(letters, draft => {
        draft[workingRow][workingBox] = key;
      });
      localStorage.setItem('letters', JSON.stringify(newLetters));
      setLetters(newLetters);
      const newWorkingBox = workingBox == 5 ? 5 : workingBox + 1;
      console.log(newWorkingBox);
      localStorage.setItem('workingBox', newWorkingBox);
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
      console.log({ specialKey });
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
  }, [workingRow, workingBox]);

  return <KeyboardContext.Provider value={{ setNextLetter }}>{children}</KeyboardContext.Provider>;
};

export { KeyboardContext };
export default KeyBoardHandling;
