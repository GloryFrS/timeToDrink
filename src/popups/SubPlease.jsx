import React from 'react';

const SubPlease = (props) => {
    if (props.subModal) {
        return ( 
            <div  onClick={props.handleCloseSubModal} className="registration-is-complete-container" >
                {/* <h1 className="well-done-popup-h1" style={{"color":'#000'}}>Это очень важно!</h1> */}
                <h2 className="well-done-popup-h2" style={{"color":'#000'}}>Подпишитесь на уведомление, чтобы всегда быть вкурсе необходимости принимать жидкость</h2>
            </div>
        );
    } else return null;
}
 
export default SubPlease;