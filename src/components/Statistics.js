import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoGraph } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { BsShareFill } from 'react-icons/bs';
import { useTransition } from 'react-spring';

import IconButton from './IconButton';
import { media } from './theme';
import { Backdrop, Modal } from './Modal';
import DistributionChart from './DistributionChart';
import useSiteContext from './SiteContext';
import { blankStatsObj } from './updateStats';
import useLocalStorage from './useLocalStorage';

const StatsButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 6 / 7;
  @media (min-width: 375px) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
`;

function generateCopyText(attempts) {
  const filteredAttempts = attempts.filter(attempt => !attempt.includes(null));

  const heading = `Skwahdle 2 ${filteredAttempts.length}/6 \n\n`;
  const renderAttempt = attempt => {
    return attempt
      .map(letter => {
        switch (letter) {
          case 'wrong':
          default:
            return '⬜';
          case 'kinda':
            return '🟨';
          case 'correct':
            return '🟩';
        }
      })
      .join('');
  };
  const attemptsCopy = filteredAttempts.map((attempt, index) => renderAttempt(attempt)).join('\n');
  return heading + attemptsCopy;
}

const Statistics = () => {
  const { statsOpen, setStatsOpen, attempts, useAlert, stats, solved } = useSiteContext();

  const showAlert = useAlert('Results copied to clipboard.');

  const transition = useTransition(statsOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      <StatsButton
        onClick={() => {
          setStatsOpen(true);
        }}
      >
        <GoGraph />
      </StatsButton>
      {transition(
        (styles, item) =>
          item && (
            <>
              <Backdrop style={styles} />
              <StatsModal style={styles}>
                <button
                  className="close"
                  onClick={() => {
                    setStatsOpen(false);
                  }}
                >
                  <IoClose />
                </button>
                {solved && <h2>You've solved it.</h2>}
                <h3 className="text-center">Statistics</h3>
                <div className="flex">
                  <div className="stat">
                    <span>{stats.gamesPlayed}</span>
                    <span>Played</span>
                  </div>
                  <div className="stat">
                    <span>{(stats.gamesWon / stats.gamesPlayed) * 100}</span>
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
                    // console.log(copyText);

                    if (navigator.share) {
                      console.log('share api available');
                      navigator.share({
                        title: `Skwahdle No. 1`,
                        text: copyText,
                      });
                    } else {
                      // console.log('share api not available');
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
          )
      )}
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
    span {
      :first-child {
        font-weight: bold;
        font-size: 3rem;
      }
    }
  }
  .share {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export default Statistics;
