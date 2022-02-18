import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import { MdSettings } from 'react-icons/md';

import Modal from './Modal';
import useSiteContext from './SiteContext';
import Button from './Button';

const SettingsButton = styled(IconButton)`
  grid-row: 2 / 3;
  grid-column: 7 / 8;
  @media (min-width: 375px) {
    grid-column: 5 / 6;
    grid-row: 1 / 2;
  }
`;

const Settings = () => {
  const [open, setOpen] = useState(false);
  const { setTheme, resetState, setStatsOpen } = useSiteContext();

  return (
    <>
      <SettingsButton onClick={() => setOpen(!open)}>
        <MdSettings />
      </SettingsButton>
      <SettingsModal open={open} onClose={() => setOpen(false)}>
        <h2>Settings</h2>
        <h3>Theme</h3>
        <ThemeSelector>
          <Color onClick={() => setTheme('default')} color={'#E1DEE3'}>
            Set Default Theme
          </Color>
          <Color onClick={() => setTheme('dark')} color={'#000F08'}>
            Set Dark Theme
          </Color>
          <Color onClick={() => setTheme('blue')} color={'#96BDC6'}>
            Set Blue Theme
          </Color>
          <Color onClick={() => setTheme('orange')} color={'#F05D23'}>
            Set Orange Theme
          </Color>
        </ThemeSelector>

        <Button
          onClick={() => {
            resetState();
            setStatsOpen(false);
          }}
        >
          Reset Board
        </Button>
      </SettingsModal>
    </>
  );
};

const ThemeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;
const Color = styled.button`
  background: ${({ color }) => color};
  border: 0px;
  height: 50px;
  width: 50px;
  margin-right: 2rem;
  border-radius: 50%;
  overflow: hidden;
  color: ${({ color }) => color};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.bs};
`;

const SettingsModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Settings;
