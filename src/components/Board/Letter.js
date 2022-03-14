import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { useSpring, animated, config } from 'react-spring';

import useSiteContext from '../SiteContext';

const Letter = ({ exampleStatus = false, status, example, letter, locked, box, row }) => {
  const flipStyles = useSpring({
    transform: locked ? 'rotateX(180deg)' : 'rotateX(0deg)',
    config: config.slow,
    delay: box * 100,
  });

  const { workingRow, workingBox, setWorkingBox, letters } = useSiteContext();
  const rowLetters = letters[row];

  const lastLetter = rowLetters[4] ? 4 : rowLetters[3] ? 3 : rowLetters[2] ? 2 : rowLetters[1] ? 1 : rowLetters[0] ? 0 : false;

  const ref = useRef();
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (workingRow === row && workingBox === box && ref.current) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [workingRow, workingBox]);

  return (
    <Flip
      status={exampleStatus || status}
      style={flipStyles}
      ref={ref}
      focus={focus}
      onClick={() => {
        if (letter || lastLetter === box - 1) {
          setWorkingBox(box);
        } else if (lastLetter < box) {
          if (lastLetter) {
            setWorkingBox(lastLetter + 1);
          } else {
            setWorkingBox(0);
          }
        } else {
          setWorkingBox(box);
        }
      }}
    >
      <div className="front">{example || letter}</div>
      <div className={`back ${exampleStatus || status || ''}`}>{example || letter}</div>
    </Flip>
  );
};

const Flip = styled(animated.button)`
  padding: 0;
  border: 0;
  background: transparent;
  transform-origin: center;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;

  text-transform: uppercase;
  font-weight: bold;
  font-size: 3.2rem;

  /* outline-color: ${({ theme }) => theme.maroon}; */
  outline-color: var(--maroon);
  outline-width: 2px;
  outline-style: ${({ focus }) => (focus ? 'solid' : 'none')};

  .front,
  .back {
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
  }
  .front {
    /* background: ${({ theme }) => theme.background}; */
    background: var(--background);
    /* color: ${({ theme }) => theme.textColor}; */
    color: var(--textColor);
    /* border: 2px solid ${({ theme }) => theme.light}; */
    border: 2px solid var(--light);
  }
  .back {
    /* background-color: ${({ status, theme }) =>
      status === 'correct' ? theme.green : status === 'kinda' ? theme.yellow : status === 'wrong' ? theme.wrong : 'transparent'}; */
    background: transparent;
    color: var(--textColor);
    &.correct {
      background: var(--green);
      color: var(--white);
    }
    &.kinda {
      background: var(--yellow);
      color: var(--white);
    }
    &.wrong {
      background: var(--wrong);
      color: var(--white);
    }
    /* color: ${({ status, theme }) => (status ? theme.white : theme.textColor)}; */
    transform: rotateX(180deg);
  }
`;

export default Letter;
