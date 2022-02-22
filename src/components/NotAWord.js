import React from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

import useSiteContext from './SiteContext';

const NotAWord = () => {
  const { notAWordModal } = useSiteContext();

  const transition = useTransition(notAWordModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transition(
        (styles, item) =>
          item && (
            <Modal style={styles}>
              <p>I got 5758 words and that ain't one.</p>
            </Modal>
          )
      )}
    </>
  );
};

const Modal = styled(animated.div)`
  padding: 2rem;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.white};
  z-index: 21;
  p {
    z-index: 2;
    position: relative;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.dark};
    opacity: 0.9;
    z-index: 1;
  }
`;

export default NotAWord;
