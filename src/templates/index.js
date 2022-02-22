import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import NotAWord from '../components/NotAWord';

const index = () => {
  return <NotAWord />;
};

export const data = graphql`
  query ($date: Date!) {
    airtable(data: { Date: { eq: $date } }) {
      id
      data {
        Word
      }
    }
  }
`;

export default index;
