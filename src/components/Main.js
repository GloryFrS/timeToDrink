import React from 'react';
import {Link} from "react-router-dom";
import DrinkPopup from '../popups/Drink'
import InfoIcon from "../img/info.png";
import SettingsIcon from "../img/settings.png";

class Main extends React.Component {
    render() {
        return (
            <div>
                <Link to='/settings'>
                    <img src={SettingsIcon} width='25px' alt='' />
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} width='25px' alt=''/>
                </Link>
                <br/>
                <img className='user-photo' src={this.props.fetchedUser ? this.props.fetchedUser.photo_200 : 'https://bipbap.ru/wp-content/uploads/2017/12/BbC-eGVCMAAY1yv.jpg'} alt=""/>
                <h2 className='addition-first'>Привет {this.props.fetchedUser ? this.props.fetchedUser.first_name : 'Username'}</h2>
                <Link to="/start">Start</Link>
                <br/>
                <DrinkPopup/>
            </div>
        )
    }
}

export default Main;
