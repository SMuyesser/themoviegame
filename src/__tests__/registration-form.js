import React from 'react';
import {shallow} from 'enzyme';
import {playerRegistrationForm} from '../components/registration-form';

it('renders without crashing', () => {
	shallow(<playerRegistrationForm />);
});
