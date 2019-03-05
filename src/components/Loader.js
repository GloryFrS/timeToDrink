import React from 'react';
import Loading from "../img/loading.gif";
import './Loader.css';
import {Redirect} from "react-router-dom";
import ApiManager from "../api/ApiManager";

class Loader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
        };
        this.setRedirect = this.setRedirect.bind(this);
    }

    setRedirect(newRedirect) {
        this.setState({redirectTo: newRedirect}, () => console.log(this.state.redirectTo));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // if (nextProps.fetchedUser) this.loadUserInfo(nextProps.fetchedUser.id);
        if (nextProps.fetchedUser) ApiManager.loadUserInfo(nextProps.fetchedUser.id, this.setRedirect);
    }

    render() {
        if (this.state.redirectTo) return(<Redirect to={this.state.redirectTo}/>);
        return (
            <div id='loader-container'>
                <img className='centered' src={Loading} alt='Loading...'/>
            </div>
        );
    }
}

export default Loader;