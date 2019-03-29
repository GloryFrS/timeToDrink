import axios from "axios";
import {dateIsToday, formatDate} from "../params/Params";

class ApiManager {

    static get url() {
        // return "http://timetodrink/api/user/";
        return "http://app9.vk-irs.ru/api/user/"
    }

    static get action() {
        return {
            read: 'read.php',
            create: 'create.php',
            update: 'update.php',
        }
    }


    static registerUser = (state) => {
        let formData = new FormData();

        formData.set('id', state.fetchedUser.id);
        formData.set('weight', state.weight);
        formData.set('weekdays_wake_time', state.weekdaysWakeUp);
        formData.set('weekdays_sleep_time', state.weekdaysGoTOSleep);
        formData.set('weekends_wake_time', state.weekendsWakeUp);
        formData.set('weekends_sleep_time', state.weekendsGoTOSleep);

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

        formData.set('id', state.fetchedUser.id);
        formData.set('weight', state.weight);
        formData.set('weekdays_wake_time', state.weekdaysWakeUp);
        formData.set('weekdays_sleep_time', state.weekdaysGoTOSleep);
        formData.set('weekends_wake_time', state.weekendsWakeUp);
        formData.set('weekends_sleep_time', state.weekendsGoTOSleep);

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

    static loadUserInfo(id, processLoadedData) {
        axios.get(ApiManager.url + ApiManager.action.read, {params: {id: id}})
            .then(res => {
                console.log(res);
                processLoadedData(res.data, '/main');
            })
            .catch(error => {
                console.log(error.response);
                const redirect = (error.message === "Network Error" || error.message === "Request failed with status code 500") ? '/network-error' : '/start' ;
                //console.log(error.response.data.message);
                processLoadedData(null, redirect);
            })
    };

    static updateLastWaterIntake(state, amountOfWater, changeUpdatedData) {
        amountOfWater = 0.001 * parseInt(amountOfWater, 10);
        const today = new Date();


        if (dateIsToday(state.lastWaterIntake)) {
            amountOfWater += parseFloat(state.amountOfWaterPerDay.toFixed(1));
        }

        const todayFormat = formatDate(today);
        console.log(state.fetchedUser.id);
        console.log(amountOfWater);
        console.log(todayFormat);

        let formData = new FormData();

        formData.set('id', state.fetchedUser.id);
        formData.set('amount_of_water_per_day', amountOfWater);
        formData.set('last_water_intake', todayFormat);

        axios({
            method: 'post',
            url: ApiManager.url + ApiManager.action.update,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => {
                console.log(res);
                //changeUpdatedData(null);
                const updatedData = {
                    lastWaterIntake: todayFormat,
                    amountOfWaterPerDay: parseFloat(amountOfWater.toFixed(1)),
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

        formData.set('id', user.id);
        formData.set('timezone', timezone.toString());

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

        formData.set('id', user.id);
        formData.set('signed_up_for_notifications', sub);

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