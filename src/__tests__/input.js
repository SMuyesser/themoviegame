import React from 'react';
import {shallow} from 'enzyme';
import Input from '../components/input';

it('renders without crashing', () => {
	const meta = jest.fn();
	const input = jest.fn();
	shallow(<Input meta={meta} input={input}/>);
});
