import axios from "axios";
import {dateIsToday, formatDate, Params} from "../params/Params";

class ApiManager {

    static get url() {
        // return "http://timetodrink/api/user/";
        return "https://cases.irsib.pro/api/user/"
    }

    static get action() {
        return {
            read: 'read.php',
            create: 'create.php',
            update: 'update.php',
        }
    }


    static registerUser = (state) => {

        const timezone = parseInt(new Date().getTimezoneOffset() / -60 , 10);

        let formData = new FormData();
        formData.append('id', state.fetchedUser.id);
        formData.append('weight', state.weight);
        formData.append('weekdays_wake_time', state.weekdaysWakeUp);
        formData.append('weekdays_sleep_time', state.weekdaysGoTOSleep);
        formData.append('weekends_wake_time', state.weekendsWakeUp);
        formData.append('weekends_sleep_time', state.weekendsGoTOSleep);
        formData.append('timezone', timezone.toString());
        formData.append('krada', state.krada);

        if (state.signedUpForNotifications !== null) {
            formData.append('signed_up_for_notifications', state.signedUpForNotifications);
        }

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.create,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    };

    static updateDataFromSettings = (state) => {
        let formData = new FormData();

        formData.append('id', state.fetchedUser.id);
        formData.append('weight', state.weight);
        formData.append('weekdays_wake_time', state.weekdaysWakeUp);
        formData.append('weekdays_sleep_time', state.weekdaysGoTOSleep);
        formData.append('weekends_wake_time', state.weekendsWakeUp);
        formData.append('weekends_sleep_time', state.weekendsGoTOSleep);
        formData.append('krada', state.krada);

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.update,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    };

    static loadUserInfo(id, krada, processLoadedData) {
        let formData = new FormData();

        formData.append('id', id);
        formData.append('krada', krada);

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.read,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
                processLoadedData(res.data, '/main');
            })
            .catch(error => {
                console.log(error.response);
                //console.log(error.response.data.message);
                if (error.message === "Network Error" || error.message === "Request failed with status code 500") {
                    processLoadedData(null, '/network-error');
                } else {
                    processLoadedData(Params.USER_REGISTRATION_FLAG, '/start');
                }
            })
    };

    static updateLastWaterIntake(state, amountOfWater, drink, changeUpdatedData) {
        amountOfWater = 0.001 * parseInt(amountOfWater, 10);

        const today = new Date();
        let factor = 0;

        switch (drink) {
            case 'water':
                factor = 1;
                break;
            case 'juice':
                factor = 0.85;
                break;
            case 'tea':
                factor = 0.9;
                break;
            case 'coffee':
                factor = 0.95;
                break;
            default:
                console.log(drink);
                break;
        }

        amountOfWater = parseFloat((amountOfWater * factor).toFixed(3));

        if (dateIsToday(state.lastWaterIntake)) {
            amountOfWater = (amountOfWater + parseFloat(state.amountOfWaterPerDay)).toFixed(3);
        }

        const todayFormat = formatDate(today);
        console.log(state.fetchedUser.id);
        console.log(amountOfWater);
        console.log(todayFormat);
        console.log(state.krada);

        let formData = new FormData();

        formData.append('id', state.fetchedUser.id);
        formData.append('amount_of_water_per_day', amountOfWater);
        formData.append('last_water_intake', todayFormat);
        formData.append('krada', state.krada);

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.update,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
                const updatedData = {
                    lastWaterIntake: todayFormat,
                    amountOfWaterPerDay: parseFloat(amountOfWater),
                };
                changeUpdatedData(updatedData);
            })
            .catch(error => {
                console.log(error);
                changeUpdatedData(null);
            })
    };

    static updateTimezone(user) {

        const timezone = parseInt(new Date().getTimezoneOffset() / -60 , 10);

        let formData = new FormData();

        formData.append('id', user.id);
        formData.append('timezone', timezone.toString());

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.update,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error.response);
            })
    };

    static updateNotificationsSubscription(user, sub) {
        let formData = new FormData();

        formData.append('id', user.id);
        formData.append('signed_up_for_notifications', sub);

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.update,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error.response);
            })
    };
    static updateSendMassagesSubscription(user, sub, krada) {
        let formData = new FormData();

        formData.append('id', user.id);
        formData.append('signed_send_massage', sub);
        formData.append('krada', krada);

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.update,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error.response);
            })
    };

}

export default ApiManager;