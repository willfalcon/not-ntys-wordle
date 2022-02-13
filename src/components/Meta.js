import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteContext from './SiteContext';
const Meta = () => {
  const { siteTheme } = useSiteContext();
  return <Helmet bodyAttributes={{ class: `${siteTheme}-theme` }}></Helmet>;
};

export default Meta;
