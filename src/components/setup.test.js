import React from 'react';
import ReactDOM from 'react-dom';
import Setup from './setup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Setup />, div);
});
