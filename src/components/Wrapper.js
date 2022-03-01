import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocalStorage } from 'react-use';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { SiteContextProvider } from './SiteContext';
import { useWindowSize } from '../lib/hooks';
import Meta from './Meta';
import Header from './Header';

import Board from './Board/Board';
import Keyboard from './Keyboard/Keyboard';
const Wrapper = ({ children }) => {
  const size = useWindowSize();
  const [siteTheme, setTheme] = useLocalStorage('theme', 'default');

  const data = useStaticQuery(graphql`
    {
      allAirtable {
        edges {
          node {
            id
            data {
              Word
              Date
            }
          }
        }
      }
    }
  `);

  const word = data.allAirtable.edges[0].node.data.Word;
  return (
    <ThemeProvider theme={theme[siteTheme] || theme.default}>
      <SiteContextProvider data={{ siteTheme, setTheme, word }}>
        <WrapperStyles windowHeight={size.height}>
          <Meta />
          <Header />
          <Board />
          <Keyboard />
          {children}
          <GlobalStyles />
        </WrapperStyles>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

const WrapperStyles = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  height: ${({ windowHeight }) => windowHeight}px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;

  position: relative;
`;

export default Wrapper;
