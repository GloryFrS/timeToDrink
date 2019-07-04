import React from 'react';
import PropTypes from 'prop-types';
import './Start.css'
import Link from "react-router-dom/es/Link";
import imgDrop from "../img/drop-water.svg";
// import imgBackground1 from "../img/background_start_wave_1.svg";


const Start = ({fetchedUser, web}) => {
    if (!fetchedUser) fetchedUser = {
        first_name: 'Username',
        photo_200: 'http://www.veseloeradio.ru/proxy/vardata/modules/news/files/1/2801/news_file_2801_5a69c430442b3.jpg?w=630&t=1516880944'
    };
    
    let desktop = web === "1" ? "start-body-container--web" : "";
    return (
        <div className={"start-body-container " + desktop}>
            <div className="start-container-info">
                <h1 className='start-user-name'>{fetchedUser.first_name},</h1>
                <h2 className='start-addition-first'>достаточно ли ты пьешь воды?</h2>
                <div className="start-user-photo-container">
                    <img className='start-user-photo' src={fetchedUser.photo_200} alt=""/>
                    <img src={imgDrop} className="start-water-drop" alt=""/>
                </div>

                <h2 className='start-addition-second'>Сервис “Время пить воду” поможет тебе стать более здоровым.</h2>
                <Link to="/first-training" data-to="main" className="start-button-start">Начнем!</Link>
            </div>
        </div>
    );
};

Start.propTypes = {
    web: PropTypes.string,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),

    })
};

export default Start;
