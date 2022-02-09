import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Board from '../components/Board/Board';
import Keyboard from '../components/Keyboard/Keyboard';
import NotAWord from '../components/NotAWord';
import Meta from '../components/Meta';
import Header from '../components/Header';

const index = ({ data }) => {
  console.log({ data });
  return (
    <Wrapper edition={data.site.siteMetadata.edition}>
      <Meta />
      <Header />
      <Board />
      <Keyboard />
      <NotAWord />
    </Wrapper>
  );
};

export const HomeQuery = graphql`
  {
    site {
      siteMetadata {
        edition
      }
    }
  }
`;

export default index;
