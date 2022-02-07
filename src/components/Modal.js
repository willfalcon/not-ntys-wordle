import styled from 'styled-components';
import { animated } from 'react-spring';
import { rgba } from 'polished';
import { media } from './theme';

const Modal = styled(animated.div)`
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
  background: white;
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
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .share {
    text-transform: uppercase;
    background: green;
    color: white;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    padding: 1rem 2rem;
  }
  .copy-content {
    background: lightgrey;
    padding: 1rem;
  }
`;

const Backdrop = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: ${rgba('white', 0.65)};
  z-index: 1;
`;

export { Modal, Backdrop };
