import React from 'react';
import ReactDOM from 'react-dom';
import Workspace from './components/Workspace';
/* global document, window, alert */

if (document) {
  const showError = () => {
    /* eslint-disable no-alert */
    alert(`Something went wrong! Some parts of this page may not be working as expected.`);
    /* eslint-enable no-alert */
  };

  const render = () => {
    try {
      ReactDOM.render(<Workspace/>, document.getElementById('main'));
    } catch (err) {
      showError();
    }
  };

  render();
}
