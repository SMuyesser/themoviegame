import React from 'react';
import {shallow} from 'enzyme';
import {GameInfo} from './gameinfo';

it('renders without crashing', () => {
	shallow(<GameInfo  linkChain={['actor1', 'movie1']}/>);
});
