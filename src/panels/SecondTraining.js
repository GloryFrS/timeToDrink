import React from 'react';
import Link from "react-router-dom/es/Link";
import {Params} from '../params/Params';

class SecondTraining extends React.Component {
    goTo = '/';

    getTimes = () => {
        const times = {
            weekdaysWakeUp: document.getElementById("weekdays-time-wake-up").value,
            weekdaysGoTOSleep: document.getElementById("weekdays-time-go-to-sleep").value,
            weekendsWakeUp: document.getElementById("weekends-time-wake-up").value,
            weekendsGoTOSleep: document.getElementById("weekends-time-go-to-sleep").value,
            wrong_data: false
        };

        if (times.weekdaysWakeUp === '' || times.weekdaysGoTOSleep === '' ||
            times.weekendsWakeUp === '' || times.weekendsGoTOSleep === '' ) {
            times.wrong_data = true;
            document.getElementById('link').to = '/second-training';

            this.goTo = '/second-training';
            alert('Invalid value!');
        }
        return times
    };

    render() {
        return (
            <div>
                <h2 className='addition-first'>
                    {this.props.fetchedUser ? this.props.fetchedUser.first_name : 'Username'}, {(this.props.userWeight ? this.props.userWeight : 70) * Params.WATER_PER_KILOGRAM}
                    л это очень много, давай определимся, когда тебе будет удобно получать напоминания о необходимость
                    выпить
                    жидкости.
                </h2>

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
                <Link id='link' to={this.goTo} onClick={this.getTimes} >Начнем</Link>
            </div>
        );
    };
}

export default SecondTraining;