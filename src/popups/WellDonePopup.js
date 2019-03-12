import React from 'react';
import Timer from "../components/Timer";
import {Params} from "../params/Params";
import "./WellDonePopup.css";

class WellDonePopup extends React.Component {
    render() {
        return (
            <div className="well-done-popup-container" onClick={()=>this.props.changeWellDonePopupVisibility()}>
                <h1 className="well-done-popup-h1">Прекрасно!</h1>
                <h2 className="well-done-popup-h2">Следующий прием жидкости через:</h2>
                <Timer className="well-done-popup-timer" seconds={Params.TIME_BETWEEN_WATER_INTAKES}/>
            </div>
        )
    }
}

export default WellDonePopup;