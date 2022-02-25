import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

import useSiteContext from '../SiteContext';

const Letter = ({ exampleStatus, status, example, letter, locked, box }) => {
  const flipStyles = useSpring({
    transform: locked ? 'rotateX(180deg)' : 'rotateX(0deg)',
    config: config.slow,
    delay: box * 100,
  });
  return (
    <Flip status={exampleStatus || status} style={flipStyles}>
      <div className="front">{example || letter}</div>
      <div className="back">{example || letter}</div>
    </Flip>
  );
};

const Flip = styled(animated.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;

  text-transform: uppercase;
  font-weight: bold;
  font-size: 3.2rem;

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
  }
  .front {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
  }
  .back {
    background-color: ${({ status, theme }) =>
      status === 'correct' ? theme.green : status === 'kinda' ? theme.yellow : status === 'wrong' ? theme.wrong : 'transparent'};
    color: ${({ status, theme }) => (status ? theme.white : theme.textColor)};
    transform: rotateX(180deg);
  }
`;

export default Letter;
