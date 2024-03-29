import React from 'react';
import {Link} from "react-router-dom";
import DrinkPopup from '../popups/DrinkPopup'
import InfoIcon from "../img/icon_info.svg";
import SettingsIcon from "../img/icon_settings.svg";
import {dateIsToday, getAmountOfWater, getTimeUntilTheNextWaterIntake} from "../params/Params";
import Timer from "./Timer";
import "./Main.css";
import WellDonePopup from "../popups/WellDonePopup";
import ProgressBar from "./ProgressBar";
import imgDrop from "../img/main-drop2.svg";
import ellipse1 from "../img/Ellipse-3.svg";
import ellipse6 from "../img/Ellipse-6.svg";
import ellipse8 from "../img/Ellipse-8.svg";
import Plus from "../img/+.svg";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLastWaterIntake: null,
            newAmountOfWaterPerDay: null,
            updatedData: null,
            drinkPopupIsVisible: false,
            wellDonePopupIsVisible: false,
        };
        this.updateLastWaterIntake = this.updateLastWaterIntake.bind(this);
        this.changeDrinkPopupVisibility = this.changeDrinkPopupVisibility.bind(this);
        this.changeWellDonePopupVisibility = this.changeWellDonePopupVisibility.bind(this);

    }

    updateLastWaterIntake = (updatedData) => {
        if (updatedData) {
            this.setState({updatedData: updatedData}, () => this.props.setNewStateAfterDrinking(this.state.updatedData));
            this.changeDrinkPopupVisibility();
            this.changeWellDonePopupVisibility();
        }
    };

    changeWellDonePopupVisibility() {
        this.setState({wellDonePopupIsVisible: !this.state.wellDonePopupIsVisible});
    };

    changeDrinkPopupVisibility() {
        if (!this.state.wellDonePopupIsVisible) {
            this.setState({drinkPopupIsVisible: !this.state.drinkPopupIsVisible});
        }
    };

    render() {
        let drinkPopup = this.state.drinkPopupIsVisible ?
            <DrinkPopup updateLastWaterIntake={this.updateLastWaterIntake}
                        state={this.props.state}
                        changeDrinkPopupVisibility={this.changeDrinkPopupVisibility}
            />
            : "";

        let wellDonePopup = this.state.wellDonePopupIsVisible ?
            <WellDonePopup changeWellDonePopupVisibility={this.changeWellDonePopupVisibility}/>: "";

        let amountOfWaterDrinkingToday = dateIsToday(this.props.state.lastWaterIntake) && this.props.state.amountOfWaterPerDay
            ? this.props.state.amountOfWaterPerDay : 0;

        return (
            <div className='main-body-container'>
                <Link to='/settings'>
                    <img src={SettingsIcon} className='main-image-settings' alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} className='main-image-info' alt=''/>
                </Link>
                <div>
                    <img className='main-user-photo'
                         src={this.props.state.fetchedUser ? this.props.state.fetchedUser.photo_200 : 'https://bipbap.ru/wp-content/uploads/2017/12/BbC-eGVCMAAY1yv.jpg'}
                         alt="..."/>
                    <h2 className='main-addition-first'>Привет<br/> {this.props.state.fetchedUser ? this.props.state.fetchedUser.first_name : 'Username'}</h2>
                </div>

                <div className='main-drop-and-progressbar-container'>
                    <ProgressBar progress={100 * amountOfWaterDrinkingToday / getAmountOfWater(this.props.state.weight)} />

                    <div className="main-drop-wave-container">


                        <img src={imgDrop} className="main-water-drop" alt=""/>

                        <img src={ellipse1} className='main-drop-ell' alt=''/>
                        <img src={ellipse1} className='main-drop-ell2' alt=''/>
                        <img src={ellipse6} className='main-drop-ell3' alt=''/>
                        <img src={ellipse8} className='main-drop-ell4' alt=''/>
                        <img src={ellipse8} className='main-drop-ell5' alt=''/>

                    </div>
                    <button className='main-button-water' onClick={this.changeDrinkPopupVisibility}><img src={Plus} className='main-image-button' alt="" /></button>
                </div>
                {/*<Link to="/start">Start</Link>*/}
                {/*<br/>*/}
                <div className="container-bottom-blocks">
                    <div className='main-info-block-today main-bottom-block'>
                        <h2 className='main-text-info-block-today'>Вы выпили сегодня:</h2>
                        <br/>
                        <h2 className = 'main-text-info-today-drink'> {amountOfWaterDrinkingToday.toFixed(1)}/{getAmountOfWater(this.props.state.weight)}л</h2>
                    </div>
                    <div className='main-water-block-today main-bottom-block'>
                        <h2 className='main-text-water-block-today'>Прием воды через:</h2>
                        <Timer seconds={getTimeUntilTheNextWaterIntake(this.props.state.lastWaterIntake)}/>
                    </div>
                </div>

                {drinkPopup}
                {wellDonePopup}
            </div>
        )
    }
}

export default Main;
