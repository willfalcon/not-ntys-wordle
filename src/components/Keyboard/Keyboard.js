import React from 'react';
import styled from 'styled-components';

import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import KeyBoardHandling from './KeyBoardHandling';

const Keyboard = () => {
  return (
    <KeyBoardHandling>
      <StyledKeyboard>
        <KeyRow keys={10}>
          <Key>q</Key>
          <Key>w</Key>
          <Key>e</Key>
          <Key>r</Key>
          <Key>t</Key>
          <Key>y</Key>
          <Key>u</Key>
          <Key>i</Key>
          <Key>o</Key>
          <Key>p</Key>
        </KeyRow>

        <KeyRow>
          <Key>a</Key>
          <Key>s</Key>
          <Key>d</Key>
          <Key>f</Key>
          <Key>g</Key>
          <Key>h</Key>
          <Key>j</Key>
          <Key>k</Key>
          <Key>l</Key>
        </KeyRow>

        <KeyRow>
          <Enter />
          <Key>z</Key>
          <Key>x</Key>
          <Key>c</Key>
          <Key>v</Key>
          <Key>b</Key>
          <Key>n</Key>
          <Key>m</Key>
          <Backspace />
        </KeyRow>
      </StyledKeyboard>
    </KeyBoardHandling>
  );
};

const StyledKeyboard = styled.div`
  padding-top: 8px;
  .key {
    width: 10%;
    width: calc(10% - 6px);
  }
`;
const KeyRow = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
`;
export default Keyboard;
