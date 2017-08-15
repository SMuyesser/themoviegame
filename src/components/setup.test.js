import React from 'react';
import axios from 'axios';
import {shallow} from 'enzyme';
import {Setup} from './setup';

it('renders without crashing', () => {
	shallow(<Setup />);
});

