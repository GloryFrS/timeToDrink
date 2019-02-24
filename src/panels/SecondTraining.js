import React from 'react';
import Link from "react-router-dom/es/Link";
import {Params} from '../params/Params';

const SecondTraining = (props) => (
    <div>
        <h2 className='addition-first'>${props.fetchedUser.first_name + ',' + props.userWeight * Params.WATER_PER_KILOGRAM } Для того, чтобы вычислить твою суточную норму жидкости, укажи свой вес.</h2>
        <input type="number" placeholder="x10" min="0" max="250" id="number"/>
        <Link to="/second-training">Начнем</Link>
    </div>
);


export default SecondTraining;