export const Params = {
    WATER_PER_KILOGRAM: 0.03
};

export const formatDate = date =>{
    return date.getFullYear() + '-' + formatNull(date.getMonth() + 1)+ '-' + formatNull(date.getDate()) + ' '
        + formatNull(date.getHours()) + ':' + formatNull(date.getMinutes()) + ':' + formatNull(date.getSeconds())
};

const formatNull = (time) => time < 10 ? '0' + time : time;


// get date format YYYY-MM-DD, return true if received date is today, else false
export const dateIsToday = date =>{
    if (!date) return false;
    const receivedDate = new Date(date);
    const today = new Date();
    return today.toDateString() === receivedDate.toDateString();
};