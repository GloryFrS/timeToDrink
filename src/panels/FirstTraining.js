import React from 'react';
import Link from "react-router-dom/es/Link";


const FirstTraining = () => (
    <div>
        <h2 className='addition-first'>Для того, чтобы вычислить твою суточную норму жидкости, укажи свой вес.</h2>
        <input type="number" placeholder="x10" min="0" max="250" id="number"/>
        <Link to="/second-training">Начнем</Link>
    </div>
);


export default FirstTraining;