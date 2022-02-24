import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children, style, secondary = false }) => {
  return (
    <StyledButton className="button" onClick={onClick} buttonStyle={style} secondary={secondary}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  text-transform: uppercase;
  background: ${({ buttonStyle, theme }) => (buttonStyle ? (buttonStyle === 'green' ? theme.green : theme.light) : theme.light)};
  color: ${({ theme, secondary }) => (secondary ? theme.dark : theme.textColor)};
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  padding: 1rem 2rem;
  cursor: pointer;
`;

export default Button;
