import React from 'react';
import {shallow, mount} from 'enzyme';
import {Dashboard} from '../components/dashboard';

describe('<Dashboard />', () => {
	it('should render without crashing ', () => {
		let dispatch = jest.fn();
		shallow(<Dashboard dispatch={dispatch} />);
	});
});