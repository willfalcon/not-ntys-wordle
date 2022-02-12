import React, { useState } from 'react';
import styled from 'styled-components';
import { GoGraph } from 'react-icons/go';

import { BsShareFill } from 'react-icons/bs';
import { differenceInDays, setHours, setMinutes, setSeconds } from 'date-fns';

import IconButton from './IconButton';
import Modal from './Modal';
import DistributionChart from './DistributionChart';
import useSiteContext from './SiteContext';
import generateCopyText from './generateCopyText';

const StatsButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 6 / 7;
  @media (min-width: 375px) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
`;

const Statistics = () => {
  const { statsOpen, setStatsOpen, attempts, useAlert, stats, solved, failed, resetState } = useSiteContext();

  const showAlert = useAlert('Results copied to clipboard.');
  const midnight = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
  const edition = differenceInDays(midnight, new Date('2022-02-05'));

  const [answer, setAnswer] = useState(false);

  async function getAnswer() {
    const rawRes = await fetch('/.netlify/functions/get-answer');
    const answer = await rawRes.json();
    setAnswer(answer);
  }
  return (
    <>
      <StatsButton
        onClick={() => {
          setStatsOpen(true);
        }}
      >
        <GoGraph />
      </StatsButton>

      <StatsModal open={statsOpen} onClose={() => setStatsOpen(false)}>
        {solved && <h2>You've solved it.</h2>}
        {failed && (
          <>
            <h2>Oh no! 😭 You Lost.</h2>
            <p>
              <span
                className="underline"
                onClick={() => {
                  resetState();
                  setStatsOpen(false);
                }}
              >
                Reset
              </span>{' '}
              or{' '}
              <span
                className="underline"
                onClick={() => {
                  getAnswer();
                }}
              >
                Show the Answer
              </span>
              .
            </p>
            {answer && (
              <p>
                <strong>Answer:</strong> "{answer}"
              </p>
            )}
          </>
        )}
        <h3 className="text-center">Statistics</h3>
        <div className="flex">
          <div className="stat">
            <span>{stats.gamesPlayed}</span>
            <span>Played</span>
          </div>
          <div className="stat">
            <span>{(stats.gamesWon / (stats.gamesPlayed || 1)) * 100}</span>
            <span>Win %</span>
          </div>
          <div className="stat">
            <span>{stats.currentStreak}</span>
            <span>Current Streak</span>
          </div>
          <div className="stat">
            <span>{stats.maxStreak}</span>
            <span>Max Streak</span>
          </div>
        </div>

        <h3 className="text-center">Guess Distribution</h3>
        <DistributionChart stats={stats} />

        <button
          className="share"
          onClick={() => {
            const copyText = generateCopyText(attempts);

            if (navigator.share) {
              navigator.share({
                title: `Skwahdle ${edition}`,
                text: copyText,
              });
            } else {
              navigator.clipboard.writeText(copyText);
              showAlert();
            }
          }}
        >
          Share
          <BsShareFill style={{ marginLeft: '5px' }} />
        </button>
      </StatsModal>
    </>
  );
};

const StatsModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .flex {
    display: flex;
    justify-content: center;
  }
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    text-align: center;
    span {
      :first-child {
        font-weight: bold;
        font-size: 3rem;
      }
    }
  }
  .underline {
    cursor: pointer;
  }
  .share {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export default Statistics;
