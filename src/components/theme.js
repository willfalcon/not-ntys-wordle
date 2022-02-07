import { css } from 'styled-components';

const theme = {
  dark: '#000F08',
  yellow: '#E7BB41',
  green: '#329F5B',
  light: '#E1DEE3',
  blue: '#B4CDED',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  sizes: {
    medium: 320,
    plus: 414,
    break: 768,
    large: 1024,
  },
};

const media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export { media };
export default theme;
