import React from 'react';
import {shallow} from 'enzyme';
import Setup from './setup';

it('renders without crashing', () => {
	shallow(<Setup />);
});
