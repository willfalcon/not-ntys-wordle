import React from 'react';
import styled from 'styled-components';

import WordRow from './WordRow';

const Board = () => {
  return (
    <BoardWrapper>
      <WordRow row={0} />
      <WordRow row={1} />
      <WordRow row={2} />
      <WordRow row={3} />
      <WordRow row={4} />
      <WordRow row={5} />
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div``;

export default Board;
