import React, { useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

import IconButton from './IconButton';
import { Backdrop, Modal } from './Modal';

import { Row } from './Board/WordRow';
import LetterBox from './Board/LetterBox';

const Instructions = () => {
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const transition = useTransition(instructionsOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      <InstructionButton
        onClick={() => {
          setInstructionsOpen(true);
        }}
      >
        <BiHelpCircle />
      </InstructionButton>
      {transition(
        (styles, item) =>
          item && (
            <>
              <Backdrop style={styles} />
              <InstructionModal style={styles}>
                <button
                  className="close"
                  onClick={() => {
                    setInstructionsOpen(false);
                  }}
                >
                  <IoClose />
                </button>

                <h3 className="text-center">How to Play</h3>
                <p>Guess the Word in 6 tries.</p>
                <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
                <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                <hr />
                <h4>Examples</h4>

                <Row example={true} row={0} className="example" style={{ justifyContent: 'flex-start' }}>
                  <LetterBox example="w" row={0} box={0} exampleStatus="correct" />
                  <LetterBox example="e" row={0} box={1} />
                  <LetterBox example="a" row={0} box={2} />
                  <LetterBox example="r" row={0} box={3} />
                  <LetterBox example="y" row={0} box={4} />
                </Row>

                <p>
                  The letter <strong>W</strong> is in the word and in the correct spot.
                </p>

                <Row example={true} row={1} className="example" style={{ justifyContent: 'flex-start' }}>
                  <LetterBox example="p" row={1} box={0} />
                  <LetterBox example="i" row={1} box={1} exampleStatus="kinda" />
                  <LetterBox example="l" row={1} box={2} />
                  <LetterBox example="l" row={1} box={3} />
                  <LetterBox example="s" row={1} box={4} />
                </Row>

                <p>
                  The letter <strong>I</strong> is in the word but in the wrong spot.
                </p>

                <Row example={true} row={2} className="example" style={{ justifyContent: 'flex-start' }}>
                  <LetterBox example="v" row={2} box={0} />
                  <LetterBox example="a" row={2} box={1} />
                  <LetterBox example="g" row={2} box={2} />
                  <LetterBox example="u" row={2} box={3} exampleStatus="wrong" />
                  <LetterBox example="e" row={2} box={4} />
                </Row>

                <p>
                  The letter <strong>U</strong> is not in the word in any spot.
                </p>

                <hr />
                <p>
                  <strong>A new Skwahdle will be available every day!</strong>
                </p>
              </InstructionModal>
            </>
          )
      )}
    </>
  );
};

const InstructionModal = styled(Modal)`
  padding: 1rem;
  h3 {
    margin-top: 0;
  }
`;

const InstructionButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  @media (min-width: 375px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

export default Instructions;
