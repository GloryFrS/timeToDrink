import React from 'react';
import ApiManager from "../api/ApiManager";
import "./DrinkPopup.css";

class DrinkPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updatedDate: null,
        };
        this.changeUpdatedData = this.changeUpdatedData.bind(this);
    }

    changeUpdatedData = (updatedData) => {
        this.setState({updatedData: updatedData}, () => this.props.updateLastWaterIntake(this.state.updatedData));
    };

    drinkWaterAndUpdateState() {
        const amountOfWater = document.querySelector('input[name="select-amount"]:checked').value;
        ApiManager.updateLastWaterIntake(this.props.state, amountOfWater, this.changeUpdatedData);
    };

    render() {
        return (
            <div className='drink-popup-container'>
                <p>Время пить жидкость!</p>
                {/*Выбираем что попить (вода, сок, чай, кофе)*/}
                <div className="cc-selector-drink">
                    <input id="water" type="radio" name="select-drink" value="water" defaultChecked={true}/>
                    <label className="drink-cc water" htmlFor="water"/>
                    <input id="juice" type="radio" name="select-drink" value="juice"/>
                    <label className="drink-cc juice" htmlFor="juice"/>
                    <br/>
                    <input id="tea" type="radio" name="select-drink" value="tea"/>
                    <label className="drink-cc tea" htmlFor="tea"/>
                    <input id="coffee" type="radio" name="select-drink" value="coffee"/>
                    <label className="drink-cc coffee" htmlFor="coffee"/>
                </div>
                <br/>
                <p>Выбери количество:</p>
                {/*Выбираем сколько пить*/}
                <div className="cc-selector-amount">
                    <input id="ml200" type="radio" name="select-amount" value="200" defaultChecked={true}/>
                    <label className="amount-cc ml200" htmlFor="ml200"/>
                    <input id="ml300" type="radio" name="select-amount" value="300"/>
                    <label className="amount-cc ml300" htmlFor="ml300"/>
                    <input id="ml400" type="radio" name="select-amount" value="400"/>
                    <label className="amount-cc ml400" htmlFor="ml400"/>
                    <input id="ml500" type="radio" name="select-amount" value="500" />
                    <label className="amount-cc ml500" htmlFor="ml500"/>
                </div>
                <button className="closes" onClick={()=> {this.drinkWaterAndUpdateState()}}>Выпить</button>
            </div>
        );
    }
}

export default DrinkPopup;