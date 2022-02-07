import React, { createContext, useContext, useState, useEffect } from 'react';
import produce from 'immer';

import setStats from './setStats';
import Alert from './Alert';

const SiteContext = createContext();

const SiteContextProvider = ({ children, data }) => {
  const [statsOpen, setStatsOpen] = useState(false);

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
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const storageLetters = localStorage.getItem('letters');

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
      setStatsOpen(true);
    }
    const storageFailed = localStorage.getItem('failed');
    if (storageFailed) {
      setFailed(true);
      setStatsOpen(true);
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

      const finishedAttempts = produce(attempts, draft => {
        draft[workingRow] = checkAttempt.result;
      });

      localStorage.setItem('attempts', JSON.stringify(finishedAttempts));
      setAttempts(finishedAttempts);

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
        setStats(finishedAttempts, true);
      } else {
        const newWorkingRow = workingRow === 6 ? workingRow : workingRow + 1;
        localStorage.setItem('workingRow', newWorkingRow);
        setWorkingRow(newWorkingRow);
        if (newWorkingRow === 6) {
          setFailed(true);
          setStats(finishedAttempts, false);
          localStorage.setItem('failed', true);
          setStatsOpen(true);
        }
        localStorage.setItem('workingBox', 0);
        setWorkingBox(0);
      }
    }
  }

  const [alertText, setAlertText] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const useAlert = (text, duration = 2000) => {
    console.log(text);
    setAlertText(text);

    function trigger() {
      console.log('alert trigger');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, duration);
    }
    return trigger;
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
        attempts,
        logAnswer,
        rowLocks,
        notAWord,
        setNotAWord,
        notAWordModal,
        solved,
        statsOpen,
        setStatsOpen,
        useAlert,
      }}
    >
      {children}
      <Alert showAlert={showAlert} alertText={alertText} />
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider, SiteContext };
export default useSiteContext;
