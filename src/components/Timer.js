import React from 'react';
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
        this.setNewState(nextProps.seconds);
    };

    componentDidMount() {
        this._isMounted = true;
        this.setNewState(this.props.seconds);
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this._isMounted) this.setState({
                seconds: this.state.seconds !== 0 ? this.state.seconds - 1 : this.state.seconds
            })}, 1000);
    };

    setNewState(seconds) {
        if (seconds) {
            this.setState({seconds: seconds}, this.startTimer);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timer);
    };

    render() {
        return (
            <div>
                <h2 className="timer">{secondsToTime(this.state.seconds)}</h2>
            </div>
        );
    };
}


export default Timer;
