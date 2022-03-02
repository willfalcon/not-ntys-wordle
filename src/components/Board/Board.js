import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import WordRow from './WordRow';

const Board = () => {
  // this fixes hydration issue that doesn't apply status color classes from localstorage state after refreshes
  // https://github.com/gatsbyjs/gatsby/issues/14601
  const [thisisdumb, setdumb] = useState(false);
  useEffect(() => {
    setdumb(true);
  }, []);
  return (
    <BoardWrapper key={thisisdumb}>
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
