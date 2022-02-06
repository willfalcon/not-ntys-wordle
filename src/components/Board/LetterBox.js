import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import theme, { media } from '../theme';

import { useSpring, animated, config } from 'react-spring';

import useSiteContext from '../SiteContext';

const LetterBox = ({ row, box, locked }) => {
  const { letters, attempts } = useSiteContext();

  const letter = letters[row][box];
  const status = attempts[row][box];

  const [styles, api] = useSpring(() => ({ transform: 'scale(1)', config: config.stiff }));
  const [innerStyles, innerApi] = useSpring(() => ({ transform: 'rotateX(0deg)', config: config.slow }));

  useEffect(() => {
    if (letter) {
      api.start({
        from: { transform: 'scale(0.8)', opacity: 0, border: '2px solid lightgrey' },
        to: { transform: 'scale(1)', opacity: 1, border: `2px solid ${theme.dark}` },
      });
    } else {
      api.start({ border: '2px solid lightgrey' });
    }
  }, [letter]);

  useEffect(() => {
    if (locked) {
      setTimeout(() => {
        api.start({
          from: {
            transform: 'scale(1)',
            opacity: 1,
            border: `2px solid ${theme.dark}`,
          },
          to: {
            transform: 'scale(1)',
            opacity: 1,
            border: `2px solid transparent`,
          },
        });
        innerApi.start({
          transform: 'rotateX(180deg)',
        });
      }, box * 100);
    }
  }, [locked]);

  return (
    <BoxWrapper style={{ ...styles }}>
      <Box status={status} style={{ transform: innerStyles.transform }}>
        <div className="front">{letter}</div>
        <div className="back">{letter}</div>
      </Box>
    </BoxWrapper>
  );
};

const BoxWrapper = styled(animated.div)`
  perspective: 1000px;
  width: 16vw;
  height: 16vw;
  border: 2px solid lightgrey;
  display: block;
  @media (min-width: 375px) {
    width: 14vw;
    height: 14vw;
  }
  ${media.break`
    width: 62px;
    height: 62px;
  `}
`;

const Box = styled(animated.div)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 3.2rem;

  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .front {
    background: white;
  }
  .back {
    border: 2px solid
      ${({ status, theme }) =>
        status === 'correct' ? theme.green : status === 'kinda' ? theme.yellow : status === 'wrong' ? theme.dark : 'lightgray'};
    color: ${({ status, theme }) => (status ? 'white' : theme.dark)};
    background-color: ${({ status, theme }) =>
      status === 'correct' ? theme.green : status === 'kinda' ? theme.yellow : status === 'wrong' ? theme.dark : 'transparent'};
    transform: rotateX(180deg);
  }
`;

export default LetterBox;
