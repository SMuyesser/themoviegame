import React from 'react';
import axios from 'axios';
import {shallow} from 'enzyme';
import App from './App';

it('renders without crashing', () => {
	shallow(<App />);
});
