import React, { createContext, useContext, useState, useEffect } from 'react';
import produce from 'immer';

import lettersList from './lettersList';

const SiteContext = createContext();

const SiteContextProvider = ({ children, data }) => {
  const [workingRow, setWorkingRow] = useState(0);
  const [workingBox, setWorkingBox] = useState(0);
  const [letters, setLetters] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [attempts, setAttempts] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const [rowLocks, setRowLocks] = useState([null, null, null, null, null, null]);

  const [notAWord, setNotAWord] = useState(false);
  const [notAWordModal, setNotAWordModal] = useState(false);

  async function logAnswer() {
    const attempt = letters[workingRow];

    if (!attempt.includes('')) {
      const raw = await fetch(`/.netlify/functions/check-word?word=${attempt.join('')}`);
      const res = await raw.json();

      if (!res.found) {
        setNotAWord(true);
        setNotAWordModal(true);
        setTimeout(() => {
          setNotAWord(false);
        }, 300);
        setTimeout(() => {
          setNotAWordModal(false);
        }, 2000);
      }

      if (res.found) {
        const raw = await fetch(`/.netlify/functions/check-attempt?word=${attempt.join('')}`);
        const res = await raw.json();

        console.log(res);

        const finishedAttempt = produce(attempts, draft => {
          draft[workingRow] = res.result;
        });

        setAttempts(finishedAttempt);

        const newRowLocks = produce(rowLocks, draft => {
          draft[workingRow] = true;
        });
        setRowLocks(newRowLocks);
        setWorkingRow(workingRow === 6 ? workingRow : workingRow + 1);
        setWorkingBox(0);
      }
    }
  }

  const keypressHandler = e => {
    console.log(e);
    if (e.key === 'Backspace') {
      backspace();
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

  const backspace = () => {
    if (workingBox !== 0) {
      const newLetters = produce(letters, draft => {
        draft[workingRow][workingBox - 1] = '';
      });
      setLetters(newLetters);
      setWorkingBox(workingBox - 1);
    }
  };

  const setNextLetter = key => {
    if (workingBox !== 5) {
      const newLetters = produce(letters, draft => {
        draft[workingRow][workingBox] = key;
      });
      setLetters(newLetters);
      setWorkingBox(workingBox == 5 ? 5 : workingBox + 1);
    }
  };

  return (
    <SiteContext.Provider
      value={{
        workingRow,
        setWorkingRow,
        workingBox,
        setWorkingBox,
        letters,
        setLetters,
        setNextLetter,
        backspace,
        attempts,
        logAnswer,
        rowLocks,
        notAWord,
        setNotAWord,
        notAWordModal,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider, SiteContext };
export default useSiteContext;
