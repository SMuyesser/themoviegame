import React from 'react';
import {shallow} from 'enzyme';
import {Field, reduxForm, focus} from 'redux-form';
import {LoginForm} from '../components/login-form';

it('should render without crashing', () => {
	const handleSubmit = jest.fn();
	const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} />);
});

