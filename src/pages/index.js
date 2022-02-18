import React from 'react';

import Wrapper from '../components/Wrapper';
import Board from '../components/Board/Board';
import Keyboard from '../components/Keyboard/Keyboard';
import NotAWord from '../components/NotAWord';

const index = () => {
  return (
    <Wrapper>
      <Board />
      <Keyboard />
      <NotAWord />
    </Wrapper>
  );
};

export default index;
