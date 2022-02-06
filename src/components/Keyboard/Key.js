import React, { useContext } from 'react';
import styled from 'styled-components';

import { KeyboardContext } from './KeyBoardHandling';
import { media } from '../theme';

const Key = ({ children }) => {
  const { setNextLetter } = useContext(KeyboardContext);

  return (
    <StyledKey
      onClick={e => {
        setNextLetter(e.target.dataset.key);
      }}
      data-key={children}
    >
      {children}
    </StyledKey>
  );
};

const StyledKey = styled.button`
  height: 58px;

  font-weight: bold;
  margin-right: 6px;
  border-radius: 4px;
  background: #d3d6da;
  color: dark;
  border-width: 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  padding: 0.5rem;
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: 360px) {
    padding: 1rem;
  }
  @media (min-width: 768px) {
    padding: 2rem;
    font-size: 1.8rem;
  }
  cursor: pointer;
`;

export { StyledKey };
export default Key;
