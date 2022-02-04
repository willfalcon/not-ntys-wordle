import { css } from 'styled-components';

const theme = {
  dark: '#222222',
  yellow: '#c9b458',
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
