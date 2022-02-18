import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteContext from './SiteContext';
const Meta = () => {
  const { siteTheme, edition } = useSiteContext();
  return (
    <Helmet bodyAttributes={{ class: `${siteTheme}-theme` }}>
      <title>{`Skwahdle - #${edition}`}</title>
    </Helmet>
  );
};

export default Meta;
