import { rgba } from 'polished';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
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
  const { attempts, solved } = useSiteContext();
  const [showModal, setShowModal] = useState(true);

  const filteredAttempts = attempts.filter(attempt => !attempt.includes(null));

  const transition = useTransition(solved && showModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition(
    (styles, item) =>
      item && (
        <>
          <Backdrop style={styles} />
          <SolvedModal style={styles}>
            <button
              className="close"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <IoClose />
            </button>
            <h2>Good Job!</h2>
            <button className="share">Share</button>

            <pre className="copy-content">
              <p>Not NTY's Wordle</p>
              {filteredAttempts.map((attempt, index) => (
                <Attempt attempt={attempt} key={index} />
              ))}
            </pre>
          </SolvedModal>
        </>
      )
  );
};

const Backdrop = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: ${rgba('white', 0.65)};
  z-index: 1;
`;

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
  .close {
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 0;
    font-weight: bold;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .share {
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
