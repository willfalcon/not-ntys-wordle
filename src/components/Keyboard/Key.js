import React, { useContext } from 'react';
import styled from 'styled-components';

import { KeyboardContext } from './KeyBoardHandling';
import useSiteContext from '../SiteContext';

const Key = ({ children }) => {
  const { setNextLetter } = useContext(KeyboardContext);
  const { letters, attempts } = useSiteContext();

  // console.log({ letters, attempts });

  const rowUsed = letters.findIndex(row => row.includes(children));
  const boxUsed = rowUsed >= 0 ? letters[rowUsed].findIndex(letter => letter === children) : false;

  if (rowUsed >= 0 && boxUsed >= 0) {
    // console.log({ letter: children, rowUsed, boxUsed });
  }

  const status = rowUsed >= 0 && boxUsed >= 0 ? attempts[rowUsed][boxUsed] : false;

  return (
    <StyledKey
      onClick={e => {
        setNextLetter(e.target.dataset.key);
      }}
      data-key={children}
      status={status}
      className="key"
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
  background: ${({ theme }) => theme.light};
  background: ${({ theme, status }) =>
    status
      ? status === 'wrong'
        ? theme.dark
        : status === 'kinda'
        ? theme.yellow
        : status === 'correct'
        ? theme.green
        : theme.light
      : theme.light};
  color: dark;
  color: ${({ theme, status }) =>
    status ? (status === 'wrong' ? 'white' : status === 'kinda' ? 'white' : status === 'correct' ? 'white' : theme.dark) : theme.dark};
  border-width: 0;
  text-transform: uppercase;
  font-size: 1.1rem;
  width: 22px;
  padding: 0.5rem;
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: 360px) {
    padding: 1rem;
    font-size: 1.4rem;
    width: 35px;
  }
  @media (min-width: 768px) {
    padding: 2rem;
    font-size: 1.8rem;
  }
  cursor: pointer;
`;

export { StyledKey };
export default Key;
