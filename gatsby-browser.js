/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'normalize.css';
import 'nprogress/nprogress.css';
import React from 'react';
import Wrapper from './src/components/Wrapper';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return <Wrapper>{element}</Wrapper>;
};
