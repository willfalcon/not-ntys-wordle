import React from 'react';

import Wrapper from '../components/Wrapper';
import Board from '../components/Board/Board';
import Keyboard from '../components/Keyboard/Keyboard';
import NotAWord from '../components/NotAWord';
import Meta from '../components/Meta';
import Header from '../components/Header';

const index = () => {
  return (
    <Wrapper>
      <Meta />
      <Header />
      <Board />
      <Keyboard />
      <NotAWord />
    </Wrapper>
  );
};

export default index;
