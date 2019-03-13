import React from 'react';
import {Link} from "react-router-dom";
import DrinkPopup from '../popups/DrinkPopup'
import InfoIcon from "../img/info.png";
import SettingsIcon from "../img/settings.png";
import {dateIsToday, getAmountOfWater, getTimeUntilTheNextWaterIntake} from "../params/Params";
import Timer from "./Timer";
import "./Main.css";
import WellDonePopup from "../popups/WellDonePopup";
import ProgressBar from "./ProgressBar";
import imgDrop from "../img/drop-water.svg";

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
        this.setState({drinkPopupIsVisible: !this.state.drinkPopupIsVisible});
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
            <div>
                <Link to='/settings'>
                    <img src={SettingsIcon} width='25px' alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} width='25px' alt=''/>
                </Link>
                <br/>
                <div>
                    <img className='main-user-photo'
                         src={this.props.state.fetchedUser ? this.props.state.fetchedUser.photo_200 : 'https://bipbap.ru/wp-content/uploads/2017/12/BbC-eGVCMAAY1yv.jpg'}
                         alt="..."/>
                    <h2 className='addition-first'>Привет {this.props.state.fetchedUser ? this.props.state.fetchedUser.first_name : 'Username'}</h2>
                </div>
                <div className="main-drop-wave-container">
                    <img src={imgDrop} className="main-water-drop" alt=""/>
                </div>
                <Link to="/start">Start</Link>
                <br/>
                <button onClick={this.changeDrinkPopupVisibility}>Водички хлебнуть</button>
                <div className="container-bottom-blocks">
                    <div >
                        <h2>Вы выпили сегодня</h2>
                        <br/>
                        <h2>{amountOfWaterDrinkingToday}/{getAmountOfWater(this.props.state.weight)}</h2>
                    </div>
                    <div >
                        <h2>Прием воды через</h2>
                        <Timer seconds={getTimeUntilTheNextWaterIntake(this.props.state.lastWaterIntake)}/>
                    </div>
                </div>
                <ProgressBar progress={100 * amountOfWaterDrinkingToday / getAmountOfWater(this.props.state.weight)}/>
                {drinkPopup}
                {wellDonePopup}
            </div>
        )
    }
}

export default Main;
