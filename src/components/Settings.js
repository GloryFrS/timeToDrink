import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/back.svg";
import InfoIcon from "../img/information.svg";
import "./Settings.css";

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prevState: null
        }
    }

    componentDidMount() {
        this.setState({
            prevState: this.props.state,
        })
    }

    getNewParameters = () => {
        const newParameters = {
            weekdaysWakeUp: document.getElementById("settings-weekdays-time-wake-up").value,
            weekdaysGoTOSleep: document.getElementById("settings-weekdays-time-go-to-sleep").value,
            weekendsWakeUp: document.getElementById("settings-weekends-time-wake-up").value,
            weekendsGoTOSleep: document.getElementById("settings-weekends-time-go-to-sleep").value,
            weight: document.getElementById("settings-weight").value,
        };

        if (newParameters.weekdaysWakeUp === '' || newParameters.weekdaysGoTOSleep === '' || newParameters.weight === '' ||
            newParameters.weekendsWakeUp === '' || newParameters.weekendsGoTOSleep === '') {
            return null
        }
        return newParameters
    };

    dataIsChanged(newState) {
        if (newState) {
            return !(newState.weight === this.state.prevState.weight.toString() &&
                newState.weekdaysWakeUp === this.state.prevState.weekdaysWakeUp.substring(0, 5) &&
                newState.weekdaysGoTOSleep === this.state.prevState.weekdaysGoTOSleep.substring(0, 5) &&
                newState.weekendsWakeUp === this.state.prevState.weekendsWakeUp.substring(0, 5) &&
                newState.weekendsGoTOSleep === this.state.prevState.weekendsGoTOSleep.substring(0, 5)
            );
        } else return false
    }

    checkAndUpdateParameters = (event) => {
        const newParameters = this.getNewParameters();
        console.log(newParameters);
        if (newParameters && this.dataIsChanged(newParameters)) {
            this.props.setNewStateFromSettings(newParameters);
        } else {
            console.log('crush');
            event.preventDefault();
        }
    };

    render() {
        return (
            <div className="settings-body-container">
                <Link to='/main'>
                    <img src={BackIcon} alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} className='settings-image-info' alt=''/>
                </Link>
                <br/>
                <p className="settings-decree">Укажите свой актуальный вес:</p>
                <input type="number" min="1" max="250" className="settings-weight" id="settings-weight" onChange={this.onChange}
                       defaultValue={this.state.prevState ? this.state.prevState.weight : null}/>
                <br/>
                <div className='settings-container-info' style={{display: 'inline'}}>
                    <p className='settings-wakeup-text'>В будние дни:</p>
                    <span className='settings-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='settings-time-to-wake-sleep'>
                        <input type="time" id="settings-weekdays-time-wake-up" className='settings-time-to-wake-up'
                               defaultValue={this.state.prevState &&  this.state.prevState.weekdaysWakeUp ? this.state.prevState.weekdaysWakeUp.substring(0, 5) : null}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="time" id="settings-weekdays-time-go-to-sleep" className='settings-time-to-sleep'
                               defaultValue={this.state.prevState &&  this.state.prevState.weekdaysGoTOSleep ? this.state.prevState.weekdaysGoTOSleep.substring(0, 5) : null}/>
                    </div>
                </div>
                <br/>
                <div style={{display: 'inline'}}>
                    <p className='settings-wakeup-text'>В выходные дни:</p>
                    <span className='settings-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='settings-time-to-wake-sleep'>
                        <input type="time" id="settings-weekends-time-wake-up" className='settings-time-to-wake-up'
                               defaultValue={this.state.prevState &&  this.state.prevState.weekendsWakeUp ? this.state.prevState.weekendsWakeUp.substring(0, 5) : null}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="time" id="settings-weekends-time-go-to-sleep" className='settings-time-to-sleep'
                               defaultValue={this.state.prevState &&  this.state.prevState.weekendsGoTOSleep ? this.state.prevState.weekendsGoTOSleep.substring(0, 5) : null}/>
                    </div>
                </div>
                <br/>
                {/*<Link to='/main' className="settings-save-button"*/}
                      {/*onClick={this.checkAndUpdateParameters}>Сохранить</Link>*/}
                <button className="settings-save-button"
                        onClick={this.checkAndUpdateParameters}>Сохранить</button>
            </div>
        )
    };
}

export default Settings;