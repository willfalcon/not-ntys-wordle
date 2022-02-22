import React from 'react';
import Wrapper from './src/components/Wrapper';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  console.log(props);
  return <Wrapper word={props.data.airtable.data.Word}>{element}</Wrapper>;
};
