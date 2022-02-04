import React from 'react';
import useSiteContext from '../SiteContext';
import { StyledKey } from './Key';

const Enter = () => {
  const { logAnswer } = useSiteContext();

  return <StyledKey onClick={logAnswer}>Enter</StyledKey>;
};

export default Enter;
