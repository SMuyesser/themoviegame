import React from 'react';
import {connect} from 'react-redux';
import {setHeader} from '../actions/game';

import Header from './header';
import GuessList from './guesslist';
import LinkChain from './linkchain';

import './game.css';

export class Game extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(setHeader('game'));
    }

    render() {
        return (
            <div className="game">
                <Header />
            	<LinkChain />
                <GuessList />
    		</div>
        );
    }
};

const mapStateToProps = ({game}) => ({
    state: game.state
});

export default connect(mapStateToProps)(Game);