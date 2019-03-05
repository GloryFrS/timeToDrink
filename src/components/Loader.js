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
            loadedData: null,
        };
        this.processLoadedData = this.processLoadedData.bind(this);
    }

    processLoadedData = (loadedData, newRedirect) =>{
        this.setState({
            redirectTo: newRedirect,
            loadedData: loadedData,
        }, ()=>this.props.setNewStateFromLoadedData(this.state.loadedData));
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.fetchedUser) ApiManager.loadUserInfo(nextProps.fetchedUser.id, this.processLoadedData);
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