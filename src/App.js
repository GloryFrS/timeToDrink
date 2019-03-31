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
import NetworkError from "./components/NetworkError";

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
            amountOfWaterPerDay: null,
            signedUpForNotifications: null,
            ACCESS_TOKEN: null,
        };
        this.setWeight = this.setWeight.bind(this);
        this.setAccessToken = this.setAccessToken.bind(this);
        this.setStateAndRegisterUser = this.setStateAndRegisterUser.bind(this);
        this.setNewStateFromSettings = this.setNewStateFromSettings.bind(this);
        this.setNewStateFromLoadedData = this.setNewStateFromLoadedData.bind(this);
        this.setNewStateAfterDrinking = this.setNewStateAfterDrinking.bind(this);
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data}, () => ApiManager.updateTimezone(this.state.fetchedUser));
                    break;

                case 'VKWebAppAllowNotificationsResult':
                    this.setState({signedUpForNotifications: 1}, () => ApiManager.updateNotificationsSubscription(this.state.signedUpForNotifications));
                    break;

                case 'VKWebAppDenyNotificationsResult':
                    this.setState({signedUpForNotifications: 0}, () => ApiManager.updateNotificationsSubscription(this.state.signedUpForNotifications));
                    break;

                case 'VKWebAppCallAPIMethodResult':
                    this.setState({signedUpForNotifications: !!e.detail.data.response.is_allowed});
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});

    }

    // Set new state access token
    setAccessToken(token) {
        this.setState({ACCESS_TOKEN: token},
            () => {
                connect.send("VKWebAppCallAPIMethod",
                    {
                        "method": "apps.isNotificationsAllowed",
                        "params": {
                            "user_id": this.state.fetchedUser.id,
                            "v": "5.92",
                            "access_token": this.state.ACCESS_TOKEN
                        }
                    });
            });
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
    setNewStateFromSettings(newState) {
        this.setState({
            weight: newState.weight,
            weekdaysWakeUp: newState.weekdaysWakeUp,
            weekdaysGoTOSleep: newState.weekdaysGoTOSleep,
            weekendsWakeUp: newState.weekendsWakeUp,
            weekendsGoTOSleep: newState.weekendsGoTOSleep
        }, () => ApiManager.updateDataFromSettings(this.state));
    }

    // Set new state from Loaded Data
    setNewStateFromLoadedData(loadedData) {
        if (loadedData) {
            this.setState({
                weight: parseInt(loadedData.weight, 10),
                weekdaysWakeUp: loadedData.weekdays_wake_time,
                weekdaysGoTOSleep: loadedData.weekdays_sleep_time,
                weekendsWakeUp: loadedData.weekends_wake_time,
                weekendsGoTOSleep: loadedData.weekends_sleep_time,
                lastWaterIntake: loadedData.last_water_intake,
                amountOfWaterPerDay: parseFloat(loadedData.amount_of_water_per_day),
                signedUpForNotifications: loadedData.signed_up_for_notifications
            }, () => this.requestASubscription());
        }
    }

    requestASubscription() {
        if (this.state.signedUpForNotifications === 0) {
            console.log("Request to notify subs");
            connect.send("VKWebAppAllowNotifications", {});
        }
    }
    // Set new state lastWaterIntake and amountOfWaterPerDay after drinking
    setNewStateAfterDrinking(newState) {
        if (newState.lastWaterIntake && newState.amountOfWaterPerDay) {
            this.setState({
                lastWaterIntake: newState.lastWaterIntake,
                amountOfWaterPerDay: newState.amountOfWaterPerDay
            }, () => console.log(this.state));
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/start" render={(props) => (
                    <Start {...props} fetchedUser={this.state.fetchedUser}/>
                )}/>

                <Route exact path="/first-training" render={(props) => (
                    <FirstTraining {...props} setWeight={this.setWeight}/>
                )}/>

                <Route exact path="/second-training" render={(props) => (
                    <SecondTraining {...props}
                                    fetchedUser={this.state.fetchedUser}
                                    weight={this.state.weight}
                                    setStateAndRegisterUser={this.setStateAndRegisterUser}
                    />
                )}/>

                <Route exact path="/settings" render={(props) => (
                    <Settings {...props}
                              state={this.state}
                              setNewStateFromSettings={this.setNewStateFromSettings}
                    />
                )}/>

                <Route exact path="/main" render={(props) => (
                    <Main {...props}
                          state={this.state}
                          setNewStateAfterDrinking={this.setNewStateAfterDrinking}
                    />
                )}/>

                <Route exact path="/info" component={Info}/>

                <Route exact path="/" render={(props) => (
                    <Loader {...props}
                            fetchedUser={this.state.fetchedUser}
                            setNewStateFromLoadedData={this.setNewStateFromLoadedData}
                    />
                )}/>

                <Route exact path="/network-error" component={NetworkError}/>
            </Switch>
        );
    }
}

export default App;
