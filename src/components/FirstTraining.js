import React from 'react';
import Link from "react-router-dom/es/Link";
import {Params} from '../params/Params';

class FirstTraining extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataIsCorrect: false
        }
    }
    onChange = (event) => {
        if (event.target.value !== '') {
            this.props.updateWeight(event);
            this.setState({dataIsCorrect: true});
            showTheAmountOfWater();
        } else  {
            this.setState({dataIsCorrect: false});
        }
    };
    render() {
        return (
            <div id="second-training-container">
                <h2 className='addition-first'>Для того, чтобы вычислить твою суточную норму жидкости, укажи свой
                    вес.</h2>
                <input type="number" min="1" max="250" id="userWeight" onChange={this.onChange}/>
                <Link to="/second-training" onClick={e => {if(!this.state.dataIsCorrect) e.preventDefault()} }>Начнем</Link>
            </div>
        );
    }
}

const showTheAmountOfWater = () => {
    const prev = document.getElementById("the-amount-of-water");
    const container = document.getElementById("second-training-container");

    if (prev) {
        container.removeChild(prev);
    }

    const newWeight = parseInt(document.getElementById("userWeight").value, 10);
    const newTag = document.createElement('h2');
    newTag.innerText = "Чтобы быть здоровым, тебе необходимо пить " + (newWeight * Params.WATER_PER_KILOGRAM).toFixed(1) + "л воды каждый день.";
    newTag.id = "the-amount-of-water";
    container.insertBefore(newTag, container.children[2]);
};

export default FirstTraining;