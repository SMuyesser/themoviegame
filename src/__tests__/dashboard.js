import React from 'react';
import {shallow, mount} from 'enzyme';
import ConnectedDashboard, {Dashboard} from '../components/dashboard';


describe('<Dashboard />', () => {
	let wrapper;
	let dispatch = jest.fn();
	let loggedIn;
	const playername = 'player';
	const scores = {
        "start" : "STAR TREK",
        "startPic" : "https://image.tmdb.org/t/p/w138_and_h175_bestv2/xPihqTMhCh6b8DHYzE61jrIiNMS.jpg",
        "end" : "GUARDIANS OF THE GALAXY VOL. 2",
        "endPic" : "https://image.tmdb.org/t/p/w138_and_h175_bestv2/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
        "linkCount" : 1,
        "links" : [
                "Zoe Saldana"
        ]
    };

	beforeEach(() => {
		wrapper = shallow(<Dashboard dispatch={dispatch} loggedIn={loggedIn} playername={playername} scores={scores} />);
	});

	it('should render without crashing ', () => {
		wrapper;
	});

	it('contains correct props', () => {
		wrapper;
		expect(wrapper.unrendered.props.playername).toEqual(playername);
		expect(wrapper.unrendered.props.scores).toEqual(scores);
	});
});