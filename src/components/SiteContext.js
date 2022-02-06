import React, { createContext, useContext, useState, useEffect } from 'react';
import produce from 'immer';

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
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const storageLetters = localStorage.getItem('letters');
    console.log(JSON.parse(storageLetters));
    if (storageLetters) {
      const newLetters = JSON.parse(storageLetters);
      setLetters(newLetters);
    }
    const storageAttempts = localStorage.getItem('attempts');
    if (storageAttempts) {
      const newAttempts = JSON.parse(storageAttempts);
      setAttempts(newAttempts);
    }
    const storageRowLocks = localStorage.getItem('rowLocks');
    if (storageRowLocks) {
      setRowLocks(JSON.parse(storageRowLocks));
    }
    const storageWorkingRow = localStorage.getItem('workingRow');
    if (storageWorkingRow) {
      setWorkingRow(parseInt(storageWorkingRow));
    }
    const storageWorkingBox = localStorage.getItem('workingBox');
    if (storageWorkingBox) {
      setWorkingBox(parseInt(storageWorkingBox));
    }
    const storageSolved = localStorage.getItem('solved');
    if (storageSolved) {
      setSolved(storageSolved);
    }
  }, []);

  async function logAnswer() {
    const attempt = letters[workingRow];

    if (!attempt.includes('')) {
      const rawCheckExists = await fetch(`/.netlify/functions/check-word?word=${attempt.join('')}`);
      const checkExists = await rawCheckExists.json();

      if (!checkExists.found) {
        setNotAWord(true);
        setNotAWordModal(true);
        setTimeout(() => {
          setNotAWord(false);
        }, 300);
        setTimeout(() => {
          setNotAWordModal(false);
        }, 2000);

        return;
      }

      const rawCheckAttempt = await fetch(`/.netlify/functions/check-attempt?word=${attempt.join('')}`);
      const checkAttempt = await rawCheckAttempt.json();

      const finishedAttempt = produce(attempts, draft => {
        draft[workingRow] = checkAttempt.result;
      });

      localStorage.setItem('attempts', JSON.stringify(finishedAttempt));
      setAttempts(finishedAttempt);

      const newRowLocks = produce(rowLocks, draft => {
        draft[workingRow] = true;
      });
      localStorage.setItem('rowLocks', JSON.stringify(newRowLocks));
      setRowLocks(newRowLocks);

      if (checkAttempt.solved) {
        localStorage.setItem('workingRow', 6);
        setWorkingRow(6);
        localStorage.setItem('workingBox', 5);
        setWorkingBox(5);
        localStorage.setItem('solved', true);
        setSolved(true);
      } else {
        const newWorkingRow = workingRow === 6 ? workingRow : workingRow + 1;
        localStorage.setItem('workingRow', newWorkingRow);
        setWorkingRow(newWorkingRow);
        localStorage.setItem('workingBox', 0);
        setWorkingBox(0);
      }
    }
  }

  return (
    <SiteContext.Provider
      value={{
        workingRow,
        setWorkingRow,
        workingBox,
        setWorkingBox,
        letters,
        setLetters,

        attempts,
        logAnswer,
        rowLocks,
        notAWord,
        setNotAWord,
        notAWordModal,
        solved,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider, SiteContext };
export default useSiteContext;
