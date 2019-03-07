import React from 'react';
import Link from "react-router-dom/es/Link";
import {Params} from '../params/Params';
import './SecondTraining.css';

class SecondTraining extends React.Component {

    getTimes = () => {
        const times = {
            weekdaysWakeUp: document.getElementById("weekdays-time-wake-up").value,
            weekdaysGoTOSleep: document.getElementById("weekdays-time-go-to-sleep").value,
            weekendsWakeUp: document.getElementById("weekends-time-wake-up").value,
            weekendsGoTOSleep: document.getElementById("weekends-time-go-to-sleep").value,
            dataIsCorrect: false
        };

        if (times.weekdaysWakeUp === '' || times.weekdaysGoTOSleep === '' ||
            times.weekendsWakeUp === '' || times.weekendsGoTOSleep === '' ) {
            times.dataIsCorrect = true;
        }
        return times
    };

    checkAndRegisterUser = (event) => {
        const times = this.getTimes();
        if (!times.dataIsCorrect) {
            this.props.setStateAndRegisterUser(times);
        } else {
            event.preventDefault();
        }
    };

    render() {
        return (
            <div>
                <h2 className='addition-first'>
                    <p className='user-name'>{this.props.fetchedUser ? this.props.fetchedUser.first_name : 'Username'}</p><br/> {((this.props.weight ? this.props.weight : 70) * Params.WATER_PER_KILOGRAM).toFixed(1)} л
                    это очень много, давай определимся, когда тебе будет удобно получать напоминания о необходимость выпить жидкости
                </h2>

                <div style={{display: 'inline'}}>
                    <p className='wakeup-text'>В будние дни:</p>
                    <span className='wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='time-to-wakesleep'><input type="time" id="weekdays-time-wake-up" className='time-to-wake'/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="time" id="weekdays-time-go-to-sleep" className='time-to-sleep'/></div>
                </div>
                <br/>
                <div style={{display: 'inline'}}>
                    <span>По будням я просыпаюсь в </span>
                    <input type="time" id="weekends-time-wake-up"/>
                    <span> и засыпаю в </span>
                    <input type="time" id="weekends-time-go-to-sleep"/>
                </div>
                <br/>
                <Link id='link' to='/main' onClick={this.checkAndRegisterUser.bind(this)} >Начнем</Link>
            </div>
        )
    };
}

export default SecondTraining;