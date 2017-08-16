import React from 'react';
import {shallow} from 'enzyme';
import {LinkChain} from './linkchain';

it('renders without crashing', () => {
	shallow(<LinkChain startMovie={'movie'} endMovie={'movie2'} linkChain={['actor1', 'movie1']} />);
});
