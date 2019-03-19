import React from 'react';
import "./RegistrationIsComplete.css";

class RegistrationIsComplete extends React.Component {
    render() {
        return (
            <div className="registration-is-complete-container">
                <h1 className="registration-is-complete-header">Отлично!</h1>
                <h2 className="registration-is-complete-content">Выпьем за это!</h2>
            </div>
        )
    }
}

export default RegistrationIsComplete;