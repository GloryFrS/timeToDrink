import React from 'react';
import Loading from "../img/loading.gif";
import './Loader.css';
import {Redirect} from "react-router-dom";
import ApiManager from "../api/ApiManager";

class Loader extends React.Component {
    _isMounted = false;
    _dataIsLoading = false;

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
            loadedData: null,
        };
        this.processLoadedData = this.processLoadedData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    processLoadedData = (loadedData, newRedirect) =>{
        if (this._isMounted) {
            this.setState({
                redirectTo: newRedirect,
                loadedData: loadedData,
            }, ()=>this.props.setNewStateFromLoadedData(this.state.loadedData));
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this._isMounted = true;
        if (nextProps.fetchedUser && !this.state.loadedData && !this._dataIsLoaded) {
            this._dataIsLoading = true;
            ApiManager.loadUserInfo(nextProps.fetchedUser.id, this.props.krada, this.processLoadedData);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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