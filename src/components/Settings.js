import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/icon_back.svg";
import InfoIcon from "../img/icon_info.svg";
import "./Settings.css";
import InputMask from 'react-input-mask';
import {valueIsTime} from "../params/Params";

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prevState: null,
            errDate: false,
            errWeight: false,
            value: ''
        }
    }

    componentWillMount() {
        this.setState({
            prevState: this.props.state,
        })
    }


    componentDidMount() {
        this.setState({
            value: (this.state.prevState && this.state.prevState.weight) ? this.state.prevState.weight : ''
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
        console.log(!valueIsTime(newParameters.weekdaysWakeUp));

        if (
            !valueIsTime(newParameters.weekdaysWakeUp) ||
            !valueIsTime(newParameters.weekdaysGoTOSleep) ||
            !valueIsTime(newParameters.weekendsWakeUp) ||
            !valueIsTime(newParameters.weekendsGoTOSleep) ||
            newParameters.weight === '' || parseInt(newParameters.weight, 10) < 10 || parseInt(newParameters.weight, 10) > 299
        ) {
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
        if (newParameters) {
            if (this.dataIsChanged(newParameters)){
                this.props.setNewStateFromSettings(newParameters);
                this.setState({ errDate: false })
            }
        } else {
            this.setState({ errDate: true })
            event.preventDefault();
        }
    };
    onChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({value: event.target.value})
        }
        if (event.target.value !== '' && parseInt(event.target.value, 10) > 9 && parseInt(event.target.value, 10) < 300) {
            this.setState({errWeight: false});
        } else  {
            this.setState({errWeight: true}); 
        }
        
    };

    render() {
        const defaultWeekdaysWakeUp = (this.state.prevState && this.state.prevState.weekdaysWakeUp) ? this.state.prevState.weekdaysWakeUp.substring(0, 5) : '';
        const defaultWeekdaysGoTOSleep =(this.state.prevState && this.state.prevState.weekdaysGoTOSleep) ? this.state.prevState.weekdaysGoTOSleep.substring(0, 5) : '';
        const defaultWeekendsWakeUp =(this.state.prevState && this.state.prevState.weekendsWakeUp) ? this.state.prevState.weekendsWakeUp.substring(0, 5) : '';
        const defaultWeekendsGoTOSleep =(this.state.prevState && this.state.prevState.weekendsGoTOSleep) ? this.state.prevState.weekendsGoTOSleep.substring(0, 5) : '';

        if (defaultWeekdaysWakeUp === '') return '';
        return (
            <div className="settings-body-container">
                <Link to='/main'>
                    <img src={BackIcon} className='settings-image-back' alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} className='settings-image-info' alt=''/>
                </Link>
                <br/>
                <p className="settings-decree">Укажите свой актуальный вес в килограммах:</p>
                <input type='tel' className="settings-weight" id="settings-weight"
                       onChange={this.onChange}
                       value={this.state.value}/>
                {this.state.errWeight ? <div className='err'>"Недопустимое число" Укажите вес от 10 до 299</div>:''} 
                <br/>
                <div className='settings-container-info'>
                    <p className='settings-wakeup-text'>В будние дни:</p>
                    <span className='settings-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='settings-time-to-wake-sleep'>
                        <InputMask 
                                    id="settings-weekdays-time-wake-up" className='settings-time-to-wake-up' 
                                    type='time' 
                                    placeholder='--:--'
                                    defaultValue={defaultWeekdaysWakeUp}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <InputMask id="settings-weekdays-time-go-to-sleep"
                                   className='settings-time-to-sleep' type='time'
                                   placeholder='--:--'
                                   defaultValue={defaultWeekdaysGoTOSleep}/>
                        {/*<input type="time" id="settings-weekdays-time-wake-up" className='settings-time-to-wake-up'*/}
                        {/*defaultValue={this.state.prevState &&  this.state.prevState.weekdaysWakeUp ? this.state.prevState.weekdaysWakeUp.substring(0, 5) : null}/>*/}
                        {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        {/*<input type="time" id="settings-weekdays-time-go-to-sleep" className='settings-time-to-sleep'*/}
                        {/*defaultValue={this.state.prevState &&  this.state.prevState.weekdaysGoTOSleep ? this.state.prevState.weekdaysGoTOSleep.substring(0, 5) : null}/>*/}
                    </div>
                </div>
                <br/>
                <div className='settings-container-info'>
                    <p className='settings-wakeup-text'>В выходные дни:</p>
                    <span className='settings-wake-time'>Просыпаюсь в: &nbsp;&nbsp;&nbsp;&nbsp;  Засыпаю в:</span> <br/>
                    <div className='settings-time-to-wake-sleep'>
                        <InputMask id="settings-weekends-time-wake-up"
                                   className='settings-time-to-wake-up' 
                                    placeholder='--:--'
                                    type='time'
                                   defaultValue={defaultWeekendsWakeUp}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <InputMask id="settings-weekends-time-go-to-sleep"
                                   className='settings-time-to-sleep' 
                                   placeholder='--:--'
                                   type='time'
                                   defaultValue={defaultWeekendsGoTOSleep}/>
                        {/*<input type="time" id="settings-weekends-time-wake-up" className='settings-time-to-wake-up'*/}
                        {/*defaultValue={this.state.prevState &&  this.state.prevState.weekendsWakeUp ? this.state.prevState.weekendsWakeUp.substring(0, 5) : null}/>*/}
                        {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        {/*<input type="time" id="settings-weekends-time-go-to-sleep" className='settings-time-to-sleep'*/}
                        {/*defaultValue={this.state.prevState &&  this.state.prevState.weekendsGoTOSleep ? this.state.prevState.weekendsGoTOSleep.substring(0, 5) : null}/>*/}
                    </div>
                </div>
                {this.state.errDate ? <div className='err'>Ошибка! Проверьте все поля</div>: ''}
                <br/>
                <Link to='/main' className="settings-save-button"
                      onClick={this.checkAndUpdateParameters.bind(this)} >Сохранить</Link>

            </div>
        )
    };
}

export default Settings;