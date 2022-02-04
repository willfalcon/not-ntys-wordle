import React from 'react';
import { MdSwitchRight } from 'react-icons/md';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import useSiteContext from './SiteContext';

const Attempt = ({ attempt }) => {
  return (
    <p style={{ margin: '5px 0' }}>
      {attempt.map(letter => {
        switch (letter) {
          case 'wrong':
          default:
            return <span style={{ marginRight: '5px' }}>⬜</span>;
          case 'kinda':
            return <span style={{ marginRight: '5px' }}>🟨</span>;
          case 'correct':
            return <span style={{ marginRight: '5px' }}>🟩</span>;
        }
      })}
    </p>
  );
};

const Solved = () => {
  const { attempts } = useSiteContext();

  const filteredAttempts = attempts.filter(attempt => !attempt.includes(null));
  console.log(filteredAttempts);

  return (
    <>
      <SolvedModal>
        <h2>Good Job!</h2>
        <button>Share</button>

        <pre className="copy-content">
          <p>Not NTY's Wordle</p>
          {filteredAttempts.map((attempt, index) => (
            <Attempt attempt={attempt} key={index} />
          ))}
        </pre>
      </SolvedModal>
    </>
  );
};

const SolvedModal = styled(animated.div)`
  position: absolute;
  width: 500px;
  max-width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: white;
  box-shadow: ${({ theme }) => theme.bs};
  text-align: center;
  padding: 3rem 1rem;
  h2 {
    margin: 0 0 2rem;
  }
  button {
    text-transform: uppercase;
    background: green;
    color: white;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    padding: 1rem 2rem;
  }
  .copy-content {
    background: lightgrey;
    padding: 1rem;
  }
`;

export default Solved;
