import React from 'react';
import ApiManager from "../api/ApiManager";
import "./DrinkPopup.css";

class DrinkPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDrink: 'water',
            selectedAmount: 200,
            dataIsUpdating: false,
            updatedDate: null,
        };
        this.changeUpdatedData = this.changeUpdatedData.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleClose = this.handleClose.bind(this); 
    }

    changeUpdatedData = (updatedData) => {
        this.setState({updatedData: updatedData}, () => this.props.updateLastWaterIntake(this.state.updatedData));
    };

    drinkWaterAndUpdateState() {
        if (!this.state.dataIsUpdating) {
            this.setState({dataIsUpdating: true}, () => ApiManager.updateLastWaterIntake(
                this.props.state,
                this.state.selectedAmount,
                this.state.selectedDrink,
                this.changeUpdatedData
            ));
        }
    };
    handleClose(e) {
        this.props.changeDrinkPopupVisibility();
    }

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

    updateDrink(drink) {
        this.setState({selectedDrink: drink})
    }

    updateAmount(amount) {
        this.setState({selectedAmount: amount})
    }

    render() {
        document.addEventListener('click', this.handleOutsideClick, false);

        let drinkWater = 'block-drink water-background water-position';
        let drinkJuice = 'block-drink juice-background juice-position';
        let drinkTea = 'block-drink tea-background tea-position';
        let drinkCoffee = 'block-drink coffee-background coffee-position';

        switch (this.state.selectedDrink) {
            case 'water':
                drinkWater = 'block-drink block-drink-checked water-position';
                break;
            case 'juice':
                drinkJuice = 'block-drink block-drink-checked juice-position';
                break;
            case 'tea':
                drinkTea = 'block-drink block-drink-checked tea-position';
                break;
            case 'coffee':
                drinkCoffee = 'block-drink block-drink-checked coffee-position';
                break;
            default:
                drinkWater = 'block-drink block-drink-checked water-position';
                break;
        }

        let amount200 = 'block-amount ml200-background ml200-position';
        let amount300 = 'block-amount ml300-background ml300-position';
        let amount400 = 'block-amount ml400-background ml400-position';
        let amount500 = 'block-amount ml500-background ml500-position';

        switch (this.state.selectedAmount) {
            case 200:
                amount200 = 'block-amount block-amount-checked ml200-position';
                break;
            case 300:
                amount300 = 'block-amount block-amount-checked ml300-position';
                break;
            case 400:
                amount400 = 'block-amount block-amount-checked ml400-position';
                break;
            case 500:
                amount500 = 'block-amount block-amount-checked ml500-position';
                break;
            default:
                amount200 = 'block-amount block-amount-checked ml200-position';
                break;
        }

        return (
            
            <div className='drink-popup-container' ref={node => {
                this.node = node
            }}>
                <span onClick={this.handleClose} className='popup-close'>+</span>
                <p className="drinkpopup-time-to-water">Время пить жидкость!</p>
                {/*Выбираем что попить (вода, сок, чай, кофе)*/}
                <div className='drinkpopup-select-drink'>
                    <div className={drinkWater} onClick={() => this.updateDrink('water')}>
                        <p className="drink-text text-water">Вода</p>
                    </div>
                    <div className={drinkJuice} onClick={() => this.updateDrink('juice')}>
                        <p className="drink-text text-juice">Сок</p>
                    </div>
                    <div className={drinkTea} onClick={() => this.updateDrink('tea')}>
                        <p className="drink-text text-tea">Чай</p>
                    </div>
                    <div className={drinkCoffee} onClick={() => this.updateDrink('coffee')}>
                        <p className="drink-text text-coffee">Кофе</p>
                    </div>
                </div>
                <p className="drinkpopup-text-choice-amount">Выберите кол-во:</p>
                {/*Выбираем сколько пить*/}
                <div className='drinkpopup-select-amount'>
                    <div className={amount200} onClick={() => this.updateAmount(200)}>
                        <p className="amount-text text-200ml">200мл</p>
                    </div>
                    <div className={amount300} onClick={() => this.updateAmount(300)}>
                        <p className="amount-text text-300ml">300мл</p>
                    </div>
                    <div className={amount400} onClick={() => this.updateAmount(400)}>
                        <p className="amount-text text-400ml">400мл</p>
                    </div>
                    <div className={amount500} onClick={() => this.updateAmount(500)}>
                        <p className="amount-text text-500ml">500мл</p>
                    </div>
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