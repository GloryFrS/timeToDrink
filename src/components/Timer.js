import React from 'react';
import './Start.css'
import {secondsToTime} from "../params/Params";

class Timer extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setNewStateAndClearInterval(nextProps);
    };

    componentDidMount() {
        this._isMounted = true;
        this.setNewStateAndClearInterval(this.props);
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (this._isMounted) this.setState({
                seconds: this.state.seconds !== 0 ? this.state.seconds - 1 : this.state.seconds
            })}, 1000);
    };

    setNewStateAndClearInterval(newState) {
        if (newState.seconds) {
            if (this.timer) clearInterval(this.timer);
            this.setState({seconds: newState.seconds}, this.startTimer)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timer);
    };

    render() {
        return (
            <div>
                <h2>{secondsToTime(this.state.seconds)}</h2>
            </div>
        );
    };
}


export default Timer;
