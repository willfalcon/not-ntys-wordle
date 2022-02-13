import React from 'react';
import styled from 'styled-components';

import Instructions from './Instructions';
import Statistics from './Statistics';
import Settings from './Settings';
import theme from './theme';

const Header = () => {
  return (
    <StyledHeader>
      <Instructions />
      <Heading>Skwahdle</Heading>
      <Statistics />
      <Settings />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  display: grid;
  column-gap: 1rem;
  align-items: center;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 30px;
  padding: 2rem 1rem;
  max-width: 100%;
  color: ${({ theme }) => theme.heading};
  @media (min-width: 375px) {
    grid-template-columns: 30px 30px 1fr 30px 30px;
    grid-template-rows: auto;
  }
`;

const Heading = styled.h1`
  text-align: center;
  text-transform: uppercase;
  grid-column: 1 / -1;
  border-bottom: 1px solid ${({ theme }) => theme.light};

  margin: 0 0 1rem;
  @media (min-width: 375px) {
    grid-column: 3 / 4;
    padding-bottom: 1rem;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export default Header;
