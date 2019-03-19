import React from "react";
import "./NetworkError.css";

class NetworkError extends React.Component {
    render() {
        return (
            <div className='network-error-container'>
                <p className='network-error-header'>Ошибка с подключением к интернету</p>
                <br/>
                <p  className='network-error-content'>Чекни подключение к интернету и попробуй еще разок</p>
            </div>
        );
    }
}

export default NetworkError;