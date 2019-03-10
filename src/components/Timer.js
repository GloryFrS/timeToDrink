import React from 'react';
import './Start.css'
import {secondsToTime} from "../params/Params";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.seconds) {
            this.setState({seconds: nextProps.seconds}, this.startTimer)
        }
    };

    startTimer() {
        this.timer = setInterval(() => this.setState({
            seconds: this.state.seconds !== 0 ? this.state.seconds - 1 : this.state.seconds
        }), 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timer)
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
