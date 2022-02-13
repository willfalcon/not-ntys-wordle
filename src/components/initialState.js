import { useState } from 'react';
import { useLocalStorage } from './hooks';
import { blankStatsObj } from './updateStats';

function useInitialState() {
  const [statsOpen, setStatsOpen] = useState(false);
  const [workingRow, setWorkingRow] = useLocalStorage('workingRow', 0);
  const [workingBox, setWorkingBox] = useLocalStorage('workingBox', 0);

  const emptyLetters = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  const emptyAttempts = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  const emptyLocks = [null, null, null, null, null, null];

  const [letters, setLetters] = useLocalStorage('letters', emptyLetters);

  const [attempts, setAttempts] = useLocalStorage('attempts', emptyAttempts);

  const [rowLocks, setRowLocks] = useLocalStorage('rowLocks', emptyLocks);

  const [notAWord, setNotAWord] = useState(false);
  const [notAWordModal, setNotAWordModal] = useState(false);
  const [solved, setSolved] = useLocalStorage('solved', false);
  const [failed, setFailed] = useLocalStorage('failed', false);

  const [stats, setStats] = useLocalStorage('stats', blankStatsObj);

  const [disabled, setDisabled] = useState(false);

  const [siteTheme, setTheme] = useLocalStorage('default');

  function resetState() {
    setLetters(emptyLetters);

    setAttempts(emptyAttempts);
    setRowLocks(emptyLocks);
    setSolved(false);
    setFailed(false);
    setWorkingRow(0);
    setWorkingBox(0);
    localStorage.setItem('last-date', new Date());
  }

  return {
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
    stats,
    setStats,
    resetState,
    disabled,
    setDisabled,
    siteTheme,
    setTheme,
  };
}

export default useInitialState;
