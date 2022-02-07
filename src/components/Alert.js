import React from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

const Alert = ({ showAlert, alertText }) => {
  console.log(alertText);
  const transition = useTransition(showAlert, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition((styles, item) => item && <StyledAlert style={styles}>{alertText}</StyledAlert>);
};

const StyledAlert = styled(animated.div)`
  background: ${({ theme }) => theme.dark};
  color: white;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 3rem;
  border-radius: 1rem;
`;

export default Alert;
