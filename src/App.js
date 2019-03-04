import React from 'react';
import connect from '@vkontakte/vkui-connect-mock';
import {Switch, Route} from "react-router-dom";
import '@vkontakte/vkui/dist/vkui.css';
import axios from "axios";


import Main from './components/Main';
import Start from './components/Start';
import SecondTraining from "./components/SecondTraining";
import FirstTraining from "./components/FirstTraining";
import Settings from "./components/Settings";
import Info from "./components/Info";
import Loader from "./components/Loader";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weight: null,
            fetchedUser: null,
            weekdaysWakeUp: null,
            weekdaysGoTOSleep: null,
            weekendsWakeUp: null,
            weekendsGoTOSleep: null,
            lastWaterIntake: null,
        };
        this.updateWeight = this.updateWeight.bind(this);
        this.updateStateAndRegisterUser = this.updateStateAndRegisterUser.bind(this);
        this.updateParameters = this.updateParameters.bind(this);
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    updateWeight(event) {
        this.setState({weight: event.target.value}, () => console.log(this.state));
    }

    updateStateAndRegisterUser(times) {
        this.setState({
            weekdaysWakeUp: times.weekdaysWakeUp,
            weekdaysGoTOSleep: times.weekdaysGoTOSleep,
            weekendsWakeUp: times.weekendsWakeUp,
            weekendsGoTOSleep: times.weekendsGoTOSleep
        }, this.registerUser);
    }

    updateParameters(newParameters) {
        this.setState({
            weight: newParameters.weight,
            weekdaysWakeUp: newParameters.weekdaysWakeUp,
            weekdaysGoTOSleep: newParameters.weekdaysGoTOSleep,
            weekendsWakeUp: newParameters.weekendsWakeUp,
            weekendsGoTOSleep: newParameters.weekendsGoTOSleep
        });
    }

    registerUser() {
        const data = {
            id: this.state.fetchedUser.id,
            weight: this.state.weight,
            weekdays_wake_time: this.state.weekdaysWakeUp,
            weekdays_sleep_time: this.state.weekdaysGoTOSleep,
            weekends_wake_time: this.state.weekendsWakeUp,
            weekends_sleep_time: this.state.weekendsGoTOSleep,
            last_water_intake: this.state.lastWaterIntake,
        };
        axios.post(`http://timetodrink/api/user/create.php`, data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error.response.status);
                console.log(error.response.data.message);
            })

        // axios({
        //     method: 'POST',
        //     url: `http://timetodrink/api/user/create.php`,
        //     data: data,
        //     header: {
        //         'Content-Type': 'application/json',
        //         //'Access-Control-Request-Headers': 'X-Custom-Header',
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(error => {
        //         console.log(error.response.status);
        //         console.log(error.response.data.message);
        //     })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/start" render={(props) => (
                    <Start {...props} fetchedUser={this.state.fetchedUser}/>
                )}/>
                <Route exact path="/first-training" render={(props) => (
                    <FirstTraining {...props} updateWeight={this.updateWeight}/>
                )}/>
                <Route exact path="/second-training" render={(props) => (
                    <SecondTraining {...props}
                                    fetchedUser={this.state.fetchedUser}
                                    userWeight={this.state.weight}
                                    updateStateAndRegisterUser={this.updateStateAndRegisterUser}/>
                )}/>

                <Route exact path="/settings" render={(props) => (
                    <Settings {...props}
                              updateParameters={this.updateParameters}/>
                )}/>
                <Route exact path="/main" render={(props) => (
                    <Main {...props} fetchedUser={this.state.fetchedUser}/>
                )}/>
                <Route exact path="/info" component={Info}/>

                <Route exact path="/" render={(props) => (
                    <Loader {...props} fetchedUser={this.state.fetchedUser}/>
                )}/>
            </Switch>
        );
    }
}

export default App;
