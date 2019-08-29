import React from 'react';
import {getAmountOfWater, valueIsTime} from '../params/Params';
import './SecondTraining.css';
import RegistrationIsComplete from "../popups/RegistrationIsComplete";
import InputMask from 'react-input-mask';

class SecondTraining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popupIsVisible: false,
            popupSub: false,
            err: false
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
            krada: this.props.krada,
            dataIsCorrect: false
        };

        if (valueIsTime(times.weekdaysWakeUp) &&
            valueIsTime(times.weekdaysGoTOSleep) &&
            valueIsTime(times.weekendsWakeUp) &&
            valueIsTime(times.weekendsGoTOSleep)) {
            times.dataIsCorrect = true;
        }
        return times
    };

    checkAndRegisterUser = (event) => {
        if (!this.state.popupIsVisible) {
            const times = this.getTimes();
            if (times.dataIsCorrect) {
                this.props.setStateAndRegisterUser(times);
                this.changePopupVisibility();
                this.setState({err: false});
            } else {
                this.setState({err: true});
                event.preventDefault();
            }
        }
    };
   

    render() {

        let popup = this.state.popupIsVisible ?
            
            <RegistrationIsComplete/>
            : '';
        
        return (
            <div className='secondtraining-container'>
                <h2 className='secondtraining-addition-first'>
                    <p className='secondtraining-user-name'>{this.props.fetchedUser ? this.props.fetchedUser.first_name : 'Username'}!</p>
                    <br/> {getAmountOfWater(this.props.weight)} л
                     - это твоя норма жидкости, давай определимся, когда тебе будет удобно получать напоминания о необходимости
                    выпить жидкость
                </h2>

                <div className='secondtraining-container-info'>
                    <p className='secondtraining-wakeup-text'>В будние дни:</p>
                    <span className='secondtraining-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span>
                    <br/>
                    
                    <div className='secondtraining-time-to-wake-sleep'>
                        <InputMask id="weekdays-time-wake-up"
                                   type='time'
                                   className='secondtraining-time-to-wake-up'
                                   placeholder='--:--'
                                   defaultValue={'08:00'}
                                   />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <InputMask id="weekdays-time-go-to-sleep"
                                   type='time'
                                   className='secondtraining-time-to-sleep' 
                                   placeholder='--:--'
                                   defaultValue={'00:00'}/>
                        {/*<input type="time" id="weekdays-time-wake-up"*/}
                               {/*className='secondtraining-time-to-wake-up'/>*/}
                        {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        {/*<input type="time" id="weekdays-time-go-to-sleep"*/}
                               {/*className='secondtraining-time-to-sleep'/>*/}
                    </div>
                </div>
                <br/>
                <div className='secondtraining-container-info'>
                    <p className='secondtraining-wakeup-text'>В выходные дни:</p>
                    <span className='secondtraining-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span>
                    <br/>
                    <div className='secondtraining-time-to-wake-sleep'>
                        <InputMask id="weekends-time-wake-up"
                                   type='time'
                                   className='secondtraining-time-to-wake-up'
                                   placeholder='--:--'
                                   defaultValue={'10:00'}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <InputMask id="weekends-time-go-to-sleep"
                                   type='time' 
                                   className='secondtraining-time-to-sleep'
                                   placeholder='--:--'
                                   defaultValue={'01:00'}/>
                        {/*<input type="time" id="weekends-time-wake-up"*/}
                               {/*className='secondtraining-time-to-wake-up'/>*/}
                        {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        {/*<input type="time" id="weekends-time-go-to-sleep"*/}
                               {/*className='secondtraining-time-to-sleep'/>*/}
                    </div>
                </div>
                {this.state.err ? <div className='err'>Неверная дата</div>: ''}
                <br/>
                <button className='secondtraining-button-start' onClick={this.checkAndRegisterUser.bind(this)}>Начать
                    больше пить
                </button>
                
                {popup}
            </div>
        )
    };
}

export default SecondTraining;