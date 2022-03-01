import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { BiHelpCircle } from 'react-icons/bi';
import { GoGraph } from 'react-icons/go';
import { MdSettings } from 'react-icons/md';

import IconButton from './IconButton';

const Header = () => {
  return (
    <StyledHeader>
      <InstructionButton to="/instructions">
        <BiHelpCircle />
      </InstructionButton>
      <Heading>
        <Link to="/">Skwahdle</Link>
      </Heading>

      <StatsButton to="/stats">
        <GoGraph />
      </StatsButton>
      <SettingsButton to="/settings">
        <MdSettings />
      </SettingsButton>
    </StyledHeader>
  );
};

const InstructionButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  @media (min-width: 375px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

const StatsButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 6 / 7;
  @media (min-width: 375px) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
`;

const SettingsButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 7 / 8;
  @media (min-width: 375px) {
    grid-column: 5 / 6;
    grid-row: 1 / 2;
  }
`;

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
  color: var(--heading);
  a {
    color: var(--heading);
  }

  @media (min-width: 375px) {
    grid-template-columns: 30px 30px 1fr 30px 30px;
    grid-template-rows: auto;
  }
`;

const Heading = styled.h1`
  text-align: center;
  text-transform: uppercase;
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--light);

  margin: 0 0 1rem;
  a {
    color: var(--heading);
    text-decoration: none;
  }
  @media (min-width: 375px) {
    grid-column: 3 / 4;
    padding-bottom: 1rem;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export default Header;
