import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import useSiteContext from './SiteContext';

import { Modal, Backdrop } from './Modal';

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

            {/* <pre className="copy-content">
              <p>Not NTY's Wordle</p>
              {filteredAttempts.map((attempt, index) => (
                <Attempt attempt={attempt} key={index} />
              ))}
            </pre> */}
          </SolvedModal>
        </>
      )
  );
};

const SolvedModal = styled(Modal)`
  text-align: center;
`;

export default Solved;
