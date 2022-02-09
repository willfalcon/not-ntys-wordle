import React, { createContext, useContext, useState, useEffect } from 'react';
import produce from 'immer';

import updateStats from './updateStats';
import Alert from './Alert';

import useInitialState from './initialState';

const SiteContext = createContext();

const SiteContextProvider = ({ children, data }) => {
  const {
    statsOpen,
    setStatsOpen,
    workingRow,
    setWorkingRow,
    workingBox,
    setWorkingBox,
    letters,
    setLetters,
    attempts,
    setAttempts,
    rowLocks,
    setRowLocks,
    notAWord,
    setNotAWord,
    notAWordModal,
    setNotAWordModal,
    solved,
    setSolved,
    failed,
    setFailed,
    resetState,
    stats,
    setStats,
  } = useInitialState();

  const { edition } = data;

  useEffect(() => {
    const lastEdition = localStorage.getItem('edition');
    if (!lastEdition) {
      resetState(edition);
    } else if (parseInt(lastEdition) !== edition) {
      resetState(edition);
    }
    if (failed || solved) {
      setStatsOpen(true);
    }
  }, []);

  async function logAnswer() {
    const attempt = letters[workingRow];

    if (!attempt.includes('')) {
      const rawCheckExists = await fetch(`/.netlify/functions/check-word?word=${attempt.join('')}`);
      const checkExists = await rawCheckExists.json();

      console.log(checkExists);

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

      // const rawCheckAttempt = await fetch(`/.netlify/functions/check-attempt?word=${attempt.join('')}`);
      // const checkAttempt = await rawCheckAttempt.json();

      const finishedAttempts = produce(attempts, draft => {
        draft[workingRow] = checkExists.result;
      });

      setAttempts(finishedAttempts);

      const newRowLocks = produce(rowLocks, draft => {
        draft[workingRow] = true;
      });
      setRowLocks(newRowLocks);

      if (checkExists.solved) {
        setWorkingRow(6);
        setWorkingBox(5);
        setSolved(true);
        updateStats(finishedAttempts, true, stats, setStats);
        setStatsOpen(true);
      } else {
        const newWorkingRow = workingRow === 6 ? workingRow : workingRow + 1;
        setWorkingRow(newWorkingRow);
        if (newWorkingRow === 6) {
          setFailed(true);
          updateStats(finishedAttempts, false, stats, setStats);
          setStatsOpen(true);
        }
        setWorkingBox(0);
      }
    }
  }

  const [alertText, setAlertText] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const useAlert = (text, duration = 2000) => {
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
        stats,
        setStats,
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
