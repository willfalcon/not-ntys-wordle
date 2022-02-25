import React, { useEffect } from 'react';

import styled, { useTheme } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

import Letter from './Letter';
import { media } from '../theme';

import useSiteContext from '../SiteContext';

const LetterBox = ({ row, box, locked, example = false, exampleStatus = false }) => {
  const { letters, attempts } = useSiteContext();
  const theme = useTheme();

  const letter = letters[row][box];
  const status = attempts[row][box];

  const [wrapperStyles, wrapperApi] = useSpring(() => ({ transform: 'scale(1)', config: config.stiff }));

  useEffect(() => {
    if (letter) {
      wrapperApi.start({
        from: { transform: 'scale(0.8)', opacity: 0, border: `2px solid ${theme.light}` },
        to: { transform: 'scale(1)', opacity: 1, border: `2px solid ${theme.maroon}` },
      });
    } else {
      wrapperApi.start({ border: `2px solid ${theme.light}` });
    }
  }, [letter, wrapperApi]);

  useEffect(() => {
    if (exampleStatus || locked) {
      setTimeout(() => {
        wrapperApi.start({
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
        // innerApi.start({
        //   transform: 'rotateX(180deg)',
        // });
      }, box * 100);
      if (!locked) {
        // innerApi.set({
        //   transform: 'rotateX(0deg)',
        // });
      }
    }
  }, [locked, box, wrapperApi, exampleStatus]);
  return (
    <BoxWrapper style={wrapperStyles}>
      <Letter letter={letter} status={status} exampleStatus={exampleStatus} example={example} locked={locked} box={box} />
    </BoxWrapper>
  );
};

const BoxWrapper = styled(animated.div)`
  width: 16vw;
  height: 16vw;
  border: 2px solid ${({ theme }) => theme.light};
  display: block;
  perspective: 500px;
  position: relative;
  @media (min-width: 375px) {
    width: 14vw;
    height: 14vw;
  }
  ${media.break`
    width: 62px;
    height: 62px;
  `}
`;

export default LetterBox;
