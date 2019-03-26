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
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    changeUpdatedData = (updatedData) => {
        this.setState({updatedData: updatedData}, () => this.props.updateLastWaterIntake(this.state.updatedData));
    };

    drinkWaterAndUpdateState() {
        const amountOfWater = document.querySelector('input[name="select-amount"]:checked').value;
        ApiManager.updateLastWaterIntake(this.props.state, amountOfWater, this.changeUpdatedData);
    };

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.props.changeDrinkPopupVisibility();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    render() {
        document.addEventListener('click', this.handleOutsideClick, false);

        return (
            <div className='drink-popup-container' ref={node => {
                this.node = node
            }}>
                <p className="drinkpopup-time-to-water">Время пить жидкость!</p>
                {/*Выбираем что попить (вода, сок, чай, кофе)*/}
                <div className="cc-selector-drink">

                    <input id="water" type="radio" name="select-drink" value="water" defaultChecked={true}/>
                    <label className="drink-cc water" htmlFor="water">
                        <p className="drink-text text-water">Вода</p>
                    </label>
                    <input id="juice" type="radio" name="select-drink" value="juice"/>
                    <label className="drink-cc juice" htmlFor="juice">
                        <p className="drink-text text-juice">Сок</p>
                    </label>
                    <br/>
                    <input id="tea" type="radio" name="select-drink" value="tea"/>
                    <label className="drink-cc tea" htmlFor="tea">
                        <p className="drink-text text-tea">Чай</p>
                    </label>
                    <input id="coffee" type="radio" name="select-drink" value="coffee"/>
                    <label className="drink-cc coffee" htmlFor="coffee">
                        <p className="drink-text text-coffee">Кофе</p>
                    </label>
                </div>
                <br/>
                <p className="drinkpopup-text-choice-amount">Выберите кол-во:</p>
                {/*Выбираем сколько пить*/}
                <div className="cc-selector-amount">
                    <input id="ml200" type="radio" name="select-amount" value="200" defaultChecked={true}/>
                    <label className="amount-cc ml200" htmlFor="ml200">
                        <p className="amount-text text-200ml">200мл</p>
                    </label>
                    <input id="ml300" type="radio" name="select-amount" value="300"/>
                    <label className="amount-cc ml300" htmlFor="ml300">
                        <p className="amount-text text-300ml">300мл</p>
                    </label>
                    <input id="ml400" type="radio" name="select-amount" value="400"/>
                    <label className="amount-cc ml400" htmlFor="ml400">
                        <p className="amount-text text-400ml">400мл</p>
                    </label>
                    <input id="ml500" type="radio" name="select-amount" value="500"/>
                    <label className="amount-cc ml500" htmlFor="ml500">
                        <p className="amount-text text-500ml">500мл</p>
                    </label>
                </div>
                <button className="drink-popup-button" onClick={() => {
                    this.drinkWaterAndUpdateState()
                }}>Выпить
                </button>
            </div>
        );
    }
}

export default DrinkPopup;