import React from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import { animated, useTransition } from 'react-spring';
import { IoClose } from 'react-icons/io5';
import { darken, rgba } from 'polished';

import { media } from './theme';
import { useOnClickOutside } from './hooks';

const Modal = ({ open, onClose, children, style, className }) => {
  const transition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const backdropTransition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 0.65 },
    leave: { opacity: 0 },
  });

  const ref = useOnClickOutside(() => {
    navigate('/');
  });

  return (
    <>
      {backdropTransition((styles, item) => item && <Backdrop style={styles} />)}
      {transition(
        (styles, item) =>
          item && (
            <>
              <StyledModal className={className} style={{ ...styles, ...style }} ref={ref}>
                <Link className="close" to="/">
                  <IoClose />
                </Link>
                {children}
              </StyledModal>
            </>
          )
      )}
    </>
  );
};

const StyledModal = styled(animated.div)`
  position: absolute;
  width: 500px;
  max-width: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  ${media.break`
    top: 50%;
    transform: translate(-50%, -50%);
  `}
  z-index: 1;
  background: ${({ theme }) => darken(0.1, theme.background)};
  box-shadow: ${({ theme }) => theme.bs};

  padding: 3rem 1rem;
  h2 {
    margin: 0 0 2rem;
  }
  h3 {
    text-transform: uppercase;
  }
  .close {
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 0;
    font-weight: bold;
    color: white;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .share {
    text-transform: uppercase;
    background: ${({ theme }) => theme.green};
    color: ${({ theme }) => theme.color};
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    padding: 1rem 2rem;
  }
`;

const Backdrop = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.background};
  opacity: 0.65;
  z-index: 1;
`;

export { StyledModal, Backdrop };
export default Modal;
