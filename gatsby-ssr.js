import React from 'react';
import Wrapper from './src/components/Wrapper';

export const wrapPageElement = ({ element }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return <Wrapper>{element}</Wrapper>;
};
