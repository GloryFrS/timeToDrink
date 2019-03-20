import React from 'react';
import Link from "react-router-dom/es/Link";
import {getAmountOfWater} from '../params/Params';
import './SecondTraining.css';
import RegistrationIsComplete from "../popups/RegistrationIsComplete";

class SecondTraining extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            popupIsVisible: false
        };
        this.changePopupVisibility = this.changePopupVisibility.bind(this);
    }
    changePopupVisibility() {
        this.setState({popupIsVisible: true});
    }

    getTimes = () => {
        const times = {
            weekdaysWakeUp: document.getElementById("weekdays-time-wake-up").value,
            weekdaysGoTOSleep: document.getElementById("weekdays-time-go-to-sleep").value,
            weekendsWakeUp: document.getElementById("weekends-time-wake-up").value,
            weekendsGoTOSleep: document.getElementById("weekends-time-go-to-sleep").value,
            dataIsCorrect: false
        };

        if (times.weekdaysWakeUp !== '' && times.weekdaysGoTOSleep !== '' &&
            times.weekendsWakeUp !== '' && times.weekendsGoTOSleep !== '' ) {
            times.dataIsCorrect = true;
        }
        return times
    };

    checkAndRegisterUser = (event) => {
        const times = this.getTimes();
        if (times.dataIsCorrect) {
            this.props.setStateAndRegisterUser(times);
            this.changePopupVisibility();
        } else {
            event.preventDefault();
        }
    };

    render() {

        let popup = this.state.popupIsVisible ?
            <Link to='/main' >
                <RegistrationIsComplete/>
            </Link>
        : '';
        return (
            <div className='secondtraining-container'>
                <h2 className='secondtraining-addition-first'>
                    <p className='secondtraining-user-name'>{this.props.fetchedUser ? this.props.fetchedUser.first_name : 'Username'}</p><br/> {getAmountOfWater(this.props.weight)} л
                    это очень много, давай определимся, когда тебе будет удобно получать напоминания о необходимость выпить жидкости
                </h2>

                <div className='secondtraining-container-info' style={{display: 'inline'}}>
                    <p className='secondtraining-wakeup-text'>В будние дни:</p>
                    <span className='secondtraining-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='secondtraining-time-to-wake-sleep'><input type="time" id="weekdays-time-wake-up" className='secondtraining-time-to-wake-up'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="time" id="weekdays-time-go-to-sleep" className='secondtraining-time-to-sleep'/></div>
                </div>
                <br/>
                <div style={{display: 'inline'}}>
                    <p className='secondtraining-wakeup-text'>В выходные дни:</p>
                    <span className='secondtraining-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='secondtraining-time-to-wake-sleep'><input type="time" id="weekends-time-wake-up" className='secondtraining-time-to-wake-up'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="time" id="weekends-time-go-to-sleep" className='secondtraining-time-to-sleep'/></div>
                    </div>
                <br/>
                <button className='secondtraining-button-start' onClick={this.checkAndRegisterUser.bind(this)} >Начать больше пить</button>
                {popup}
            </div>
        )
    };
}

export default SecondTraining;