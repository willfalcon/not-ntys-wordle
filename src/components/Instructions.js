import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

import styled from 'styled-components';
import { rgba } from 'polished';

import Modal from './Modal';

import { Row } from './Board/WordRow';
import LetterBox from './Board/LetterBox';
import { KeyRow } from './Keyboard/Keyboard';
import ExampleKey from './Keyboard/ExampleKey';
import useSiteContext from './SiteContext';

const Instructions = () => {
  const { instructionsOpen, setInstructionsOpen } = useSiteContext();
  const [advanced, setAdvanced] = useState(false);
  useEffect(() => {
    setInstructionsOpen(true);
    return () => {
      setInstructionsOpen(false);
    };
  });

  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  return (
    <InstructionModal open={instructionsOpen} advanced={advanced} exampleHeight={height}>
      <h3 className="text-center">How to Play</h3>
      <p>Guess the Word in 6 tries.</p>
      <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
      <hr />
      <div className="tabs">
        <button onClick={() => setAdvanced(false)}>Examples</button>
        <button onClick={() => setAdvanced(true)}>Advanced Examples</button>
      </div>
      <div className="examples" ref={ref}>
        {!advanced ? (
          <>
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
          </>
        ) : (
          <>
            <Row example={true} row={0} className="example">
              <LetterBox example="e" row={0} box={0} exampleStatus="correct" />
              <LetterBox example="n" row={0} box={1} />
              <LetterBox example="t" row={0} box={2} />
              <LetterBox example="e" row={0} box={3} exampleStatus="kinda" />
              <LetterBox example="r" row={0} box={4} />
            </Row>

            <p>
              The first letter <strong>E</strong> is in the word and in the correct spot.
            </p>
            <p>
              The second letter <strong>E</strong> in the word, but this one is in the wrong spot.
            </p>

            <KeyRow>
              <ExampleKey>q</ExampleKey>
              <ExampleKey exampleStatus="correct">w</ExampleKey>
              <ExampleKey>e</ExampleKey>
              <ExampleKey>r</ExampleKey>
              <ExampleKey exampleStatus="correct">t</ExampleKey>
              <ExampleKey>y</ExampleKey>
              <ExampleKey>u</ExampleKey>
              <ExampleKey exampleStatus="kinda">i</ExampleKey>
              <ExampleKey>o</ExampleKey>
              <ExampleKey exampleStatus="wrong">p</ExampleKey>
            </KeyRow>
            <p>Generally, colors on the keyboard match colors on the board.</p>

            <Row example={true} row={0} className="example">
              <LetterBox example="e" row={0} box={0} exampleStatus="correct" />
              <LetterBox example="b" row={0} box={1} />
              <LetterBox example="o" row={0} box={2} />
              <LetterBox example="n" row={0} box={3} exampleStatus="kinda" />
              <LetterBox example="y" row={0} box={4} exampleStatus="correct" />
            </Row>
            <KeyRow>
              <ExampleKey>q</ExampleKey>
              <ExampleKey>w</ExampleKey>
              <ExampleKey exampleStatus="kinda">e</ExampleKey>
              <ExampleKey>r</ExampleKey>
              <ExampleKey>t</ExampleKey>
              <ExampleKey exampleStatus="correct">y</ExampleKey>
              <ExampleKey>u</ExampleKey>
              <ExampleKey>i</ExampleKey>
              <ExampleKey exampleStatus="wrong">o</ExampleKey>
              <ExampleKey>p</ExampleKey>
            </KeyRow>

            <p>
              The letter <strong>E</strong> on the board is correct. However, the <strong>E</strong> is yellow on the keyboard. This means
              there is another <strong>E</strong> in the word!
            </p>
          </>
        )}
      </div>
      <hr />
      <p>
        <strong>A new Skwahdle will be available every day!</strong>
      </p>
    </InstructionModal>
  );
};

const InstructionModal = styled(Modal)`
  padding: 1rem;
  h3 {
    margin-top: 0;
  }
  hr {
    margin-bottom: 0;
  }
  .tabs {
    background: ${({ theme }) => theme.white};
    margin-bottom: 1rem;
    button {
      background: transparent;
      margin-right: 5px;
      border: 0px;
      padding: 1rem 0.5rem;
      cursor: pointer;
      transition: 0.15s;
      &:hover {
        background: ${({ theme }) => rgba(theme.light, 0.5)};
      }
      &:first-child {
        border-bottom: ${({ advanced, theme }) => (!advanced ? `2px solid ${theme.dark}` : '0px')};
      }
      &:last-child {
        border-bottom: ${({ advanced, theme }) => (advanced ? `2px solid ${theme.dark}` : '0px')};
      }
    }
  }

  .examples {
    height: ${({ exampleHeight }) => (exampleHeight ? `${exampleHeight}px` : 'auto')};
  }
`;

export default Instructions;
