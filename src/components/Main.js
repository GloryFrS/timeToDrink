import React from 'react';
import {Link} from "react-router-dom";
import Drink from '../popups/Drink'

class Main extends React.Component {
    render() {
        return (
            <div>
                <h2>Main</h2>
                <h2 className='addition-first'>Привет {this.props.fetchedUser ? this.props.fetchedUser.first_name : 'Username'}</h2>
                <Link to="/start">Start</Link>
                <Drink/>
            </div>
        )
    }
}

export default Main;
