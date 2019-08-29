import React from 'react';
import "./WellDonePopup.css";

class WellDonePopup extends React.Component {
    render() {
        return (
            <div className="well-done-popup-container" style={this.props.end ? {"background": "red"}: {}} onClick={()=>this.props.changeWellDonePopupVisibility()}>
                <h1 className="well-done-popup-h1">{this.props.end ? "Внимание!": 'Дело сделано!'}</h1>
                <h2 className="well-done-popup-h2">{this.props.end ? "Превышен лимит кол-во жидкости на сегодня": 'Следующий прием жидкости через:'}</h2>
                {this.props.end ? '' : this.props.timer}
            </div>
        )
    }
}

export default WellDonePopup;