import React, { useContext } from 'react';
import styled from 'styled-components';

import { MdOutlineBackspace } from 'react-icons/md';
import { StyledKey } from './Key';

import { KeyboardContext } from './KeyBoardHandling';

const Backspace = () => {
  const { backspace } = useContext(KeyboardContext);
  return (
    <BackspaceKey onClick={backspace}>
      <MdOutlineBackspace />
    </BackspaceKey>
  );
};

const BackspaceKey = styled(StyledKey)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default Backspace;
