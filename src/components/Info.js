import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/back.png";


class Info extends React.Component {
    render() {
        return (
            <div>
                <Link to='/main' onClick={this.checkAndUpdateParameters}>
                    <img width='25px' src={BackIcon} alt=''/>
                </Link>
                <br/>
                <h1>Сервис разработан и поддерживается командой LUNA Apps</h1>
                <br/>
                <h2>Ждем писем:</h2>
                <ul>
                    <li>С предложениями по улучшению наших сервисов;</li>
                    <li>С заказами на разработку сервисов;</li>
                </ul>
                <br/>
                <button>Написать нам</button>
                <br/>
                <small>
                    Свяжитесь с нами по email: <br/>
                    <a href="mailto:ask@htmlbook.ru"> hello@lunaapps.ru</a>
                </small>
            </div>
        )
    };
}

export default Info;