import React from 'react';
import Link from "react-router-dom/es/Link";
import {getAmountOfWater} from '../params/Params';
import './FirstTraining.css'

class FirstTraining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIsCorrect: false,
            theAmountOfWater: <br/>,
            err:false,
            value: ''
        }
    }

    onChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({value: event.target.value})
        }
        if (event.target.value !== '' && parseInt(event.target.value, 10) > 9 && parseInt(event.target.value, 10) < 300) {
            this.props.setWeight(event);
            this.setState({
                dataIsCorrect: true,
                err: false,
                theAmountOfWater: <h2 className="firsttraining-drink-water">Чтобы быть здоровым, тебе необходимо пить {getAmountOfWater(event.target.value )} л. воды каждый день</h2>
            });
        } else  {
            this.setState({dataIsCorrect: false, err: true});
        }
    };
    render() {

        return (
            <div  className='firsttraining-container'>
                <h2 className='firsttraining-addition-first'>Для того, чтобы вычислить Вашу суточную норму жидкости, укажите Ваш
                    вес.</h2>
                <p className='firsttraining-enter-weight'>Введите свой вес в килограммах:</p>
                <input type='tel' value={this.state.value} min="1" max="299" id="weight"  onChange={this.onChange} placeholder='от 10 до 299' className='firsttraining-weight'/>
                <div style={this.state.err ? {display: 'block'}:{display: 'none'}} className='err'>Ошибка! "Недопустимое число"</div>
                <br/>
                {this.state.theAmountOfWater}
                <Link to="/second-training" className="firsttraining-button-start"  onClick={e => {if(!this.state.dataIsCorrect) e.preventDefault()} }>Начнем</Link>
            </div>
        );
    }
}

export default FirstTraining;