import React from 'react';
import connect from '@vkontakte/vkui-connect-mock';
import {Switch, Route} from "react-router-dom";
import '@vkontakte/vkui/dist/vkui.css';

import Main from './panels/Main';
import Start from './panels/Start';
import SecondTraining from "./panels/SecondTraining";
import FirstTraining from "./panels/FirstTraining";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'start',
            userWeight: null,
            fetchedUser: null,
            geoData: null,
            weekdaysWakeUp: null,
            weekdaysGoTOSleep: null,
            weekendsWakeUp: null,
            weekendsGoTOSleep: null
        };
        this.updateWeight = this.updateWeight.bind(this);
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                case 'VKWebAppGeodataResult':
                    this.setState({geoData: e.detail.data});
                    /*console.log(
                        'lat:' + this.state.geoData.lat +
                        'long:' + this.state.geoData.long
                    )*/
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
        connect.send("VKWebAppGetGeodata", {});
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/start" render={() => (
                    <Start fetchedUser={this.state.fetchedUser}/>
                )}/>
                <Route exact path="/first-training" render={() => (
                    <FirstTraining updateWeight={this.updateWeight}/>
                )}/>
                <Route exact path="/second-training" render={() => (
                    <SecondTraining
                        fetchedUser={this.state.fetchedUser}
                        userWeight={this.state.userWeight}
                        updateTimeToSleep={this.state.updateTimeToSleep}
                    />
                )}/>
            </Switch>
        );
    }

    updateWeight(event) {
        this.setState({activePanel: event.target.value});
    }

    updateTimeToSleep(times) {
        if (!times.wrong_data) {
            this.setState({
                weekdaysWakeUp: times.weekdaysWakeUp,
                weekdaysGoTOSleep: times.weekdaysGoTOSleep,
                weekendsWakeUp: times.weekendsWakeUp,
                weekendsGoTOSleep: times.weekendsGoTOSleep
            });
        }
    }
}

export default App;
