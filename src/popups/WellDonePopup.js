import React from 'react';
import "./WellDonePopup.css";

class WellDonePopup extends React.Component {
    render() {
        return (
            <div className="well-done-popup-container" onClick={()=>this.props.changeWellDonePopupVisibility()}>
                <h1 className="well-done-popup-h1">Прекрасно!</h1>
                <h2 className="well-done-popup-h2">Следующий прием жидкости через:</h2>
                {this.props.timer}
            </div>
        )
    }
}

export default WellDonePopup;