import React from 'react';
import {shallow} from 'enzyme';
import {EndMovie} from './endMovie';

it('renders without crashing', () => {
	shallow(<EndMovie />);
});
