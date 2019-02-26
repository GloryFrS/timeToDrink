import React from "react";
import Popup from "reactjs-popup";
import './Drink.css';

const contentStyle = {
    maxWidth: "600px",
    width: "80%"
};

export default () => (
    <Popup
        trigger={<button>Выпить водички епт</button>}
        modal
        closeOnDocumentClick
        contentStyle={contentStyle}>
        {close => (
            <div>
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
                    <input id="ml200" type="radio" name="select-amount" value="ml200" defaultChecked={true}/>
                    <label className="amount-cc ml200" htmlFor="ml200"/>
                    <input id="ml300" type="radio" name="select-amount" value="ml300"/>
                    <label className="amount-cc ml300" htmlFor="ml300"/>
                    <input id="ml400" type="radio" name="select-amount" value="ml400"/>
                    <label className="amount-cc ml400" htmlFor="ml400"/>
                    <input id="ml500" type="radio" name="select-amount" value="ml500"/>
                    <label className="amount-cc ml500" htmlFor="ml500"/>
                </div>
                <Popup
                    trigger={<button className="closes">Выпить</button>}
                    modal
                    closeOnDocumentClick
                    contentStyle={contentStyle}
                    onClose={close}>
                    <div>
                        <h1>Прекрасно!</h1>
                        <p>Следующий прием пищи через:</p>
                        <h2>02:40:55</h2>
                    </div>
                </Popup>
            </div>
        )}
    </Popup>
);
