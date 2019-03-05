import React from 'react';
import connect from '@vkontakte/vkui-connect-mock';
import {Switch, Route} from "react-router-dom";
import '@vkontakte/vkui/dist/vkui.css';

import ApiManager from "./api/ApiManager";
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
        this.setWeight = this.setWeight.bind(this);
        this.setStateAndRegisterUser = this.setStateAndRegisterUser.bind(this);
        this.setNewState = this.setNewState.bind(this);
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

    // Set new state weight
    setWeight(event) {
        this.setState({weight: event.target.value});
    }

    // Set new state and send to DB create request
    setStateAndRegisterUser(times) {
        this.setState({
            weekdaysWakeUp: times.weekdaysWakeUp,
            weekdaysGoTOSleep: times.weekdaysGoTOSleep,
            weekendsWakeUp: times.weekendsWakeUp,
            weekendsGoTOSleep: times.weekendsGoTOSleep,
        }, () => ApiManager.registerUser(this.state));
    }

    // Set new state from Settings and send to DB update request
    setNewState(newState) {
        this.setState({
            weight: newState.weight,
            weekdaysWakeUp: newState.weekdaysWakeUp,
            weekdaysGoTOSleep: newState.weekdaysGoTOSleep,
            weekendsWakeUp: newState.weekendsWakeUp,
            weekendsGoTOSleep: newState.weekendsGoTOSleep
        }, () =>  ApiManager.updateDataFromSettings(this.state));
    }

    render() {
        return (
            <Switch>
                <Route exact path="/start" render={(props) => (
                    <Start {...props} fetchedUser={this.state.fetchedUser}/>
                )}/>
                <Route exact path="/first-training" render={(props) => (
                    <FirstTraining {...props} updateWeight={this.setWeight}/>
                )}/>
                <Route exact path="/second-training" render={(props) => (
                    <SecondTraining {...props}
                                    fetchedUser={this.state.fetchedUser}
                                    userWeight={this.state.weight}
                                    updateStateAndRegisterUser={this.setStateAndRegisterUser}/>
                )}/>

                <Route exact path="/settings" render={(props) => (
                    <Settings {...props}
                              updateParameters={this.setNewState}/>
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
