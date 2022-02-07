import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

function useInitialState() {
  const [statsOpen, setStatsOpen] = useState(false);
  const [workingRow, setWorkingRow] = useLocalStorage('workingRow', 0);
  const [workingBox, setWorkingBox] = useLocalStorage('workingBox', 0);

  const [letters, setLetters] = useLocalStorage('letters', [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [attempts, setAttempts] = useLocalStorage('attempts', [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const [rowLocks, setRowLocks] = useLocalStorage('rowLocks', [null, null, null, null, null, null]);

  const [notAWord, setNotAWord] = useState(false);
  const [notAWordModal, setNotAWordModal] = useState(false);
  const [solved, setSolved] = useLocalStorage('solved', false);
  const [failed, setFailed] = useLocalStorage('failed', false);

  function resetState(edition) {
    setLetters([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ]);

    setAttempts([
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]);
    setRowLocks([null, null, null, null, null, null]);
    setSolved(false);
    setFailed(false);
    setWorkingRow(0);
    setWorkingBox(0);
    localStorage.setItem('edition', edition);
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
    resetState,
  };
}

export default useInitialState;
