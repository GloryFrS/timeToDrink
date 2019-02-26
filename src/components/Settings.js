import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/back.png";
import InfoIcon from "../img/info.png";

class Settings extends React.Component {


    getNewParameters = () => {
        const newParameters = {
            weekdaysWakeUp: document.getElementById("weekdays-time-wake-up").value,
            weekdaysGoTOSleep: document.getElementById("weekdays-time-go-to-sleep").value,
            weekendsWakeUp: document.getElementById("weekends-time-wake-up").value,
            weekendsGoTOSleep: document.getElementById("weekends-time-go-to-sleep").value,
            userWeight: document.getElementById("userWeight").value,
        };

        if (newParameters.weekdaysWakeUp === '' || newParameters.weekdaysGoTOSleep === '' || newParameters.userWeight === '' ||
            newParameters.weekendsWakeUp === '' || newParameters.weekendsGoTOSleep === '' ) {
            return null
        }
        return newParameters
    };

    checkAndUpdateParameters = (event) => {
        const newParameters = this.getNewParameters();
        if (newParameters) {
            this.props.updateParameters(newParameters);
        } else {
            event.preventDefault();
        }
    };

    render() {
        return (
            <div>
                <Link to='/'>
                    <img src={BackIcon} width='25px' alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} width='25px' alt=''/>
                </Link>
                <br/>
                <p>Укажите свой актуальный вес:</p>
                <input type="number" min="1" max="250" id="userWeight" onChange={this.onChange}/>
                <div style={{display: 'inline'}}>
                    <span>По будням я просыпаюсь в </span>
                    <input type="time" id="weekdays-time-wake-up"/>
                    <span> и засыпаю в </span>
                    <input type="time" id="weekdays-time-go-to-sleep"/>
                </div>
                <br/>
                <div style={{display: 'inline'}}>
                    <span>По будням я просыпаюсь в </span>
                    <input type="time" id="weekends-time-wake-up"/>
                    <span> и засыпаю в </span>
                    <input type="time" id="weekends-time-go-to-sleep"/>
                </div>
                <br/>
                <Link to='/' onClick={this.checkAndUpdateParameters} >Сохранить</Link>
            </div>
        )
    };
}

export default Settings;