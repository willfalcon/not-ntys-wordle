import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import { MdSettings } from 'react-icons/md';

const SettingsButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 7 / 8;
  @media (min-width: 375px) {
    grid-column: 5 / 6;
    grid-row: 1 / 2;
  }
`;

const Settings = () => {
  return (
    <SettingsButton>
      <MdSettings />
    </SettingsButton>
  );
};

export default Settings;
