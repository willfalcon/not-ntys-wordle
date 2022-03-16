import React from 'react';

import Modal from '../components/Modal';

const error404 = () => {
  return (
    <Modal open={true}>
      <h1>404 Error</h1>
    </Modal>
  );
};

export default error404;
