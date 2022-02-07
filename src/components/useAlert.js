import { useState } from 'react';

function useAlert(text, duration = 2000) {
  const [showAlert, setShowAlert] = useState(false);
  function trigger() {
    showAlert(true);
    setTimeout(() => {
      showAlert(false);
    }, duration);
  }

  return trigger;
}

export default useAlert;
