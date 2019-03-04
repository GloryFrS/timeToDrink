import React from 'react';
import Loading from "../img/loading.gif";
import './Loader.css';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Loader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
        };
    }

    loadUserInfo(id) {
        axios.get(`http://timetodrink/api/user/read.php`, {params: {id: id}})
            .then(res => {
                this.setState({redirectTo: '/main'});
                console.log(res);
            })
            .catch(error => {
                this.setState({redirectTo: "/start"}, () => console.log(this.state.redirectTo));
                console.log(error.response.status);
                console.log(error.response.data.message);
            })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.fetchedUser) this.loadUserInfo(nextProps.fetchedUser.id);
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