import React from 'react';
import PropTypes from 'prop-types';
import './Start.css'
import Link from "react-router-dom/es/Link";
import imgDrop from "../img/drop-water.svg";


const Start = ({fetchedUser}) =>{
	if (!fetchedUser) fetchedUser = {
		first_name: 'Username',
		photo_200: 'http://www.veseloeradio.ru/proxy/vardata/modules/news/files/1/2801/news_file_2801_5a69c430442b3.jpg?w=630&t=1516880944'
	};
	return (
		<div className="body-container">
			<h1 className='user-name'>{fetchedUser.first_name}</h1>
			<h2 className='addition-first'>достаточно ли ты пьешь воды?</h2>
			<div className="user-photo-container">
                <img className='user-photo' src={fetchedUser.photo_200} alt=""/>
                <img src = {imgDrop} className="water-drop" alt=""/>
			</div>

			<h2 className='addition-second'>Сервис “Время пить воду” поможет тебе стать более здоровым.</h2>
			<Link to="/first-training" onClick={go} data-to="main" className = "button-start">Начнем!</Link>
		</div>
	);
};

const go = () => console.log('kek');

Start.propTypes = { 
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
