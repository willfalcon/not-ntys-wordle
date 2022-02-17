import { css } from 'styled-components';

const base = {
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  sizes: {
    medium: 320,
    plus: 414,
    break: 768,
    large: 1024,
  },
};

const stash = {
  dark: '#000F08',
  yellow: '#FFC857',
  green: '#00916E',
  light: '#E1DEE3',
  blue: '#B4CDED',
  maroon: '#5D1725',
};

const theme = {
  default: {
    dark: stash.dark,
    background: 'white',
    wrong: stash.maroon,
    white: 'white',
    yellow: stash.yellow,
    green: stash.green,
    light: stash.light,
    blue: stash.blue,
    maroon: stash.maroon,
    heading: stash.dark,
    ...base,
  },
  dark: {
    dark: stash.light,
    wrong: stash.maroon,
    white: '#F3F5F6',
    background: stash.dark,
    yellow: stash.yellow,
    green: stash.green,
    light: '#435058',
    blue: stash.blue,
    maroon: stash.maroon,
    heading: stash.light,
    ...base,
  },
  blue: {
    dark: '#435058',
    background: '#96BDC6',
    wrong: '#C84630',
    white: 'white',
    yellow: stash.yellow,
    green: stash.green,
    light: stash.light,
    blue: stash.blue,
    maroon: stash.maroon,
    heading: stash.light,
    ...base,
  },
  orange: {
    dark: '#101419',
    background: '#F05D23',
    wrong: '#101419',
    white: '#FDFFFC',
    yellow: '#F0A823',
    green: '#19A889',
    light: stash.light,
    blue: stash.blue,
    maroon: stash.maroon,
    heading: '#FDFFFC',
    ...base,
  },
  green: {
    dark: '#201E50',
    background: '#A9C5A0',
    wrong: '#525B76',
    white: 'white',
    yellow: '#FF9F1C',
    green: '#A9C5A0',
    light: stash.light,
    blue: stash.blue,
    maroon: stash.maroon,
    heading: stash.light,
    ...base,
  },
};
// 000F08
// #F3F5F6
const media = Object.keys(base.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${base.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export { media };
export default theme;
