import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/back.svg";
import InfoIcon from "../img/info.png";
import "./Settings.css";

class Settings extends React.Component {


    getNewParameters = () => {
        const newParameters = {
            weekdaysWakeUp: document.getElementById("settings-weekdays-time-wake-up").value,
            weekdaysGoTOSleep: document.getElementById("settings-weekdays-time-go-to-sleep").value,
            weekendsWakeUp: document.getElementById("settings-weekends-time-wake-up").value,
            weekendsGoTOSleep: document.getElementById("settings-weekends-time-go-to-sleep").value,
            weight: document.getElementById("settings-weight").value,
        };

        if (newParameters.weekdaysWakeUp === '' || newParameters.weekdaysGoTOSleep === '' || newParameters.weight === '' ||
            newParameters.weekendsWakeUp === '' || newParameters.weekendsGoTOSleep === '' ) {
            return null
        }
        return newParameters
    };

    checkAndUpdateParameters = (event) => {
        const newParameters = this.getNewParameters();
        if (newParameters) {
            this.props.setNewStateFromSettings(newParameters);
        } else {
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
                    <img src={InfoIcon} width='25px' alt=''/>
                </Link>
                <br/>
                <p className="settings-decree">Укажите свой актуальный вес:</p>
                <input type="number" min="1" max="250"  className="settings-weight" id="weight" onChange={this.onChange}/>
                <br/>
                <div className='settings-container-info' style={{display: 'inline'}}>
                    <p className='settings-wakeup-text'>В будние дни:</p>
                    <span className='settings-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='settings-time-to-wake-sleep'><input type="time" id="settings-weekdays-time-wake-up" className='settings-time-to-wake-up'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="time" id="settings-weekdays-time-go-to-sleep" className='settings-time-to-sleep'/></div>
                </div>
                <br/>
                <div style={{display: 'inline'}}>
                    <p className='settings-wakeup-text'>В выходные дни:</p>
                    <span className='settings-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='settings-time-to-wake-sleep'><input type="time" id="settings-weekends-time-wake-up" className='settings-time-to-wake-up'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="time" id="settings-weekends-time-go-to-sleep" className='settings-time-to-sleep'/></div>
                </div>
                <br/>
                <Link to='/main' className="settings-save-button" onClick={this.checkAndUpdateParameters} >Сохранить</Link>
            </div>
        )
    };
}

export default Settings;