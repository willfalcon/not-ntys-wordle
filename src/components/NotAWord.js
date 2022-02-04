import { rgba } from 'polished';
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
              <p>I got 8499 words and that ain't one.</p>
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
  background: ${({ theme }) => rgba(theme.dark, 0.9)};
  color: white;
  z-index: 21;
`;

export default NotAWord;
