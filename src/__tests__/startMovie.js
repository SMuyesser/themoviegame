import React from 'react';
import {shallow} from 'enzyme';
import {StartMovie} from '../components/startMovie';

it('renders without crashing', () => {
	shallow(<StartMovie />);
});
