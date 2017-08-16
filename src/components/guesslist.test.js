import React from 'react';
import {shallow} from 'enzyme';
import {GuessList} from './guesslist';

it('renders without crashing', () => {
	shallow(<GuessList startMovie={'movie'} endMovie={'movie2'} endMovieId={1} 
			linkChain={['actor1', 'movie1']} currentLinkTitle={'title'} />);
});
