import React from 'react';
import axios from 'axios';
import {shallow} from 'enzyme';
import Home from './home';

it('renders without crashing', () => {
	shallow(<Home />);
});
