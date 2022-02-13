import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children, style }) => {
  return (
    <StyledButton className="button" onClick={onClick} buttonStyle={style}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  text-transform: uppercase;
  background: ${({ buttonStyle, theme }) => (buttonStyle ? (buttonStyle === 'green' ? theme.green : theme.light) : theme.light)};
  color: ${({ theme }) => theme.dark};
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  padding: 1rem 2rem;
`;

export default Button;
