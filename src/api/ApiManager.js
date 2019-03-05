import axios from "axios";

class ApiManager {

    static get url() {
        return "http://timetodrink/api/user/";
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
                console.log(error.response.data.message);
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
                console.log(error.response.data.message);
            })
    };

    static loadUserInfo(id, processLoadedData) {
        axios.get(ApiManager.url + ApiManager.action.read, {params: {id: id}})
            .then(res => {
                console.log(res);
                processLoadedData(res.data, '/main');
            })
            .catch(error => {
                console.log(error.response.status);
                console.log(error.response.data.message);
                processLoadedData(null, '/start');
            })
    }
}

export default ApiManager;