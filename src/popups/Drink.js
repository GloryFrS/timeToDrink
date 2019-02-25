import React from "react";
import Popup from "reactjs-popup";

export default () => (
    <Popup trigger={<button>Trigger</button>} position="top left">
        {close => (
            <div>
                Content here
                <a className="close" onClick={close}>
                    Close me
                </a>
            </div>
        )}
    </Popup>
);