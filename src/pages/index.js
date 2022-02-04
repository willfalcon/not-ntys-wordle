import React from 'react';
import styled from 'styled-components';

import Wrapper from '../components/Wrapper';
import Board from '../components/Board/Board';
import Keyboard from '../components/Keyboard/Keyboard';
import NotAWord from '../components/NotAWord';
import Solved from '../components/Solved';
import Meta from '../components/Meta';

const index = () => {
  return (
    <Wrapper>
      <Meta />
      <Heading>Skwahdle</Heading>
      <Board />
      <Keyboard />
      <NotAWord />
      <Solved />
    </Wrapper>
  );
};

const Heading = styled.h1`
  text-align: center;
`;

export default index;
