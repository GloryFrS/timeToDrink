import React from 'react';
import "./RegistrationIsComplete.css";
import { Redirect } from 'react-router'


class RegistrationIsComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        };
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick = () => {
        this.setState({
            redirectTo: '/main'
        })
    }

    render() {
        if (this.state.redirectTo) return(<Redirect push to={this.state.redirectTo}/>);
        return (
            <div onClick={this.handleClick} className="registration-is-complete-container">
                <h1 className="registration-is-complete-header">Отлично!</h1>
                <h2 className="registration-is-complete-content">Выпьем за это!</h2>
            </div>
        )
    }
}

export default RegistrationIsComplete;