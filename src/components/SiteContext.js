import React, { createContext, useContext, useState, useEffect } from 'react';
import produce from 'immer';
import { isSameDay } from 'date-fns';
import NProgress from 'nprogress';
import { differenceInDays, setHours, setMinutes, setSeconds } from 'date-fns';

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
    disabled,
    setDisabled,
  } = useInitialState();

  const today = new Date();

  const midnight = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
  const edition = differenceInDays(midnight, new Date('2022-02-05'));

  useEffect(() => {
    const lastDate = localStorage.getItem('last-date');
    if (!lastDate) {
      resetState(today);
    } else if (!isSameDay(new Date(lastDate), today)) {
      resetState(today);
    }
    if (failed || solved) {
      setStatsOpen(true);
    }
  }, []);

  async function logAnswer() {
    setDisabled(true);
    NProgress.start();

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
        setDisabled(false);
        NProgress.done();
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
    setDisabled(false);
    NProgress.done();
  }

  const [alertText, setAlertText] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const useAlert = (text, duration = 2000) => {
    function trigger() {
      setAlertText(text);
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
        failed,
        statsOpen,
        setStatsOpen,
        useAlert,
        stats,
        setStats,
        disabled,
        setDisabled,
        resetState,
        edition,
        ...data,
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
