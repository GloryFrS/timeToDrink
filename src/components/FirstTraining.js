import React from 'react';
import Link from "react-router-dom/es/Link";
import {Params} from '../params/Params';

class FirstTraining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIsCorrect: false,
            theAmountOfWater: <br/>
        }
    }

    onChange = (event) => {
        if (event.target.value !== '') {
            this.props.setWeight(event);
            this.setState({
                dataIsCorrect: true,
                theAmountOfWater: <h2>Чтобы быть здоровым, тебе необходимо пить {(event.target.value * Params.WATER_PER_KILOGRAM).toFixed(1)} л воды каждый день.</h2>
            });
        } else  {
            this.setState({dataIsCorrect: false});
        }
    };

    render() {

        return (
            <div id="second-training-container">
                <h2 className='addition-first'>Для того, чтобы вычислить твою суточную норму жидкости, укажи свой
                    вес.</h2>
                <input type="number" min="1" max="250" id="weight" onChange={this.onChange}/>
                <br/>
                {this.state.theAmountOfWater}
                <Link to="/second-training" onClick={e => {if(!this.state.dataIsCorrect) e.preventDefault()} }>Начнем</Link>
            </div>
        );
    }
}

export default FirstTraining;