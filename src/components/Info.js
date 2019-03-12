import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/back.png";
import "./Info.css";

class Info extends React.Component {
    render() {
        return (
            <div className="info-main-container">
                <Link to='/main'>
                    <img width='25px' src={BackIcon} alt=''/>
                </Link>
                <br/>
                <h1 className="info-header">Сервис разработан и поддерживается командой LUNA Apps</h1>
                <br/>
                <h2 className="info-header2">Ждем писем:</h2>
                {/*{Картинки для галочки уже загрузил info-check-mark!!!!!!!!!!!!!!!!!!!!!!!!*/}
                <span>
                    <p>С предложениями по улучшению наших сервисов;</p>
                </span>
                <span>
                    <p>С заказами на разработку сервисов;</p>
                </span>

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