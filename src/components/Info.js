import React from 'react';
import Link from "react-router-dom/es/Link";
import BackIcon from "../img/icon_back.svg";
import "./Info.css";
import CheckIcon from "../img/Ellipsecheck.svg";

class Info extends React.Component {
    render() {
        return (
            <div className="info-main-container">
                <Link to='/main'>
                    <img src={BackIcon} className='info-image-back' alt=''/>
                </Link>
                <br/>
                <h1 className="info-header">Сервис разработан и поддерживается командой LUNA Apps</h1>
                <br/>
                <h2 className="info-header2">Ждем писем:</h2>
                {/*{Картинки для галочки уже загрузил info-check-mark!!!!!!!!!!!!!!!!!!!!!!!!*/}

                <span>
                    <p className="info-first"><img src={CheckIcon} alt=" " className="info-image-galochka"/>&nbsp;С предложениями по улучшению наших сервисов;</p>
                </span>
                <span>
                    <p className="info-second"><img src={CheckIcon} alt=" " className="info-image-galochka"/>&nbsp;С заказами на разработку сервисов;</p>
                </span>

                <a href="https://vk.com/im?media=&sel=-178245062"  target="_blank" rel="noopener noreferrer" className="info-button">Написать нам</a>
                <br/>
                <small className="info-connect">
                    Свяжитесь с нами по email: <br/>
                    <a href="mailto:hello@lunaapps.ru" target="_blank" rel="noopener noreferrer" className="info-connect-mail"> hello@lunaapps.ru</a>
                </small>
            </div>
        )
    };
}

export default Info;