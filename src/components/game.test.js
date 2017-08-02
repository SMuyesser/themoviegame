import React from 'react';
import {shallow} from 'enzyme';
import Game from './game';

it('renders without crashing', () => {
	shallow(<Game />);
});
