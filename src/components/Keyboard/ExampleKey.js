import React from 'react';
import { StyledKey } from './Key';

const ExampleKey = ({ children, exampleStatus = 'unused' }) => {
  return (
    <StyledKey
      data-key={children}
      status={exampleStatus}
      className="key"
      style={{ padding: 0, justifyContent: 'center', alignItems: 'center' }}
    >
      {children}
    </StyledKey>
  );
};

export default ExampleKey;
