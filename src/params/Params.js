export const Params = {
    WATER_PER_KILOGRAM: 0.03,
    TIME_BETWEEN_WATER_INTAKES: 7200,   // in seconds = 2 hours
    USER_REGISTRATION_FLAG: 1
};

export const formatDate = date =>{
    return date.getFullYear() + '-' + formatNull(date.getMonth() + 1)+ '-' + formatNull(date.getDate()) + ' '
        + formatNull(date.getHours()) + ':' + formatNull(date.getMinutes()) + ':' + formatNull(date.getSeconds())
};

const formatNull = (time) => time < 10 ? '0' + time : time;


// get date format YYYY-MM-DD, return true if received date is today, else false
export const dateIsToday = date =>{
    if (!date) return false;
    const timeArr = date.split(/[^0-9]/);
    const receivedDate = new Date(timeArr[0], timeArr[1]-1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
    const today = new Date();
    return today.toDateString() === receivedDate.toDateString();
};

export const getAmountOfWater = weight => (Params.WATER_PER_KILOGRAM * (weight ?  parseFloat(weight) : 70)).toFixed(1);

export const secondsToTime = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return formatNull(hours)+ ':' + formatNull(minutes )+ ':' + formatNull(seconds);
};

export const diffDatesInSeconds = (date1, date2 = new Date()) => {
    if (!date1) return 0;

    const timeArr = date1.split(/[^0-9]/);
    date1 = new Date(timeArr[0], timeArr[1]-1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
    const diff = (date2.getTime() - date1.getTime()) / 1000;
    return diff > 0 ? diff.toFixed(0) : (diff * -1).toFixed(0);
};

export const getTimeUntilTheNextWaterIntake = date => {
    const diff = parseInt(diffDatesInSeconds(date), 10);
    return diff >= Params.TIME_BETWEEN_WATER_INTAKES ? 0 : Params.TIME_BETWEEN_WATER_INTAKES - diff;
};

export const valueIsTime = value => {
    if (!value) return false;
    return !!value.match('([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}');
};
