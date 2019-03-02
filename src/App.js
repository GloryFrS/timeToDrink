import React from 'react';
import connect from '@vkontakte/vkui-connect-mock';
import {Switch, Route} from "react-router-dom";
import '@vkontakte/vkui/dist/vkui.css';

import Main from './components/Main';
import Start from './components/Start';
import SecondTraining from "./components/SecondTraining";
import FirstTraining from "./components/FirstTraining";
import Settings from "./components/Settings";
import Info from "./components/Info";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weight: null,
            fetchedUser: null,
            weekdaysWakeUp: null,
            weekdaysGoTOSleep: null,
            weekendsWakeUp: null,
            weekendsGoTOSleep: null
        };
        this.updateWeight = this.updateWeight.bind(this);
        this.updateTimeToSleep = this.updateTimeToSleep.bind(this);
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
        this.setState({weight: event.target.value});
    }

    updateTimeToSleep(times) {
        this.setState({
            weekdaysWakeUp: times.weekdaysWakeUp,
            weekdaysGoTOSleep: times.weekdaysGoTOSleep,
            weekendsWakeUp: times.weekendsWakeUp,
            weekendsGoTOSleep: times.weekendsGoTOSleep
        }, ()=>console.log(this.state));
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
                        updateTimeToSleep={this.updateTimeToSleep}/>
                )}/>
                <Route exact path="/" render={(props) => (
                    <Main {...props}
                        fetchedUser={this.state.fetchedUser}/>
                )}/>
                <Route exact path="/settings" render={(props) => (
                    <Settings {...props}
                        updateParameters={this.updateParameters}/>
                )}/>
                <Route exact path="/info" component={Info}/>

            </Switch>
        );
    }
}

export default App;
