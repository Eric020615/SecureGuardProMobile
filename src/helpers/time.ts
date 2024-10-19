import moment from 'moment-timezone';

// Convert a DateTimeOffset string to a Date object
export const convertDateStringToDate = (dateString: string) => {
    if (!dateString) return null;
    return moment(dateString).toDate();
};

// Convert a Date object to a formatted DateTimeOffset string
export const convertDateToDateString = (date: Date, dateFormat: string) => {
    if (!date) return '';
    return moment(date).format(dateFormat);
};

// Convert a DateTimeOffset string to a formatted DateTimeOffset string
export const convertDateStringToFormattedString = (dateString: string, dateFormat: string) => {
    if (!dateString) return '';
    return moment(dateString).format(dateFormat);
};

// Get the current date as a Date object
export const getCurrentDate = () => {
    return new Date();
};

// Get the current date as a formatted DateTimeOffset string
export const getCurrentDateString = (dateFormat: string) => {
    return moment().format(dateFormat);
};

// Get a formatted DateTimeOffset string from a Date object
export const getFormattedDateStringFromDate = (date: Date, dateFormat: string) => {
    if (!date) return '';
    return moment(date).format(dateFormat);
};

// Get relative time from now for a given date
export const getRelativeTimeFromNow = (date: Date) => {
    if (!date) return '';
    return moment.tz(date, "Asia/Kuala_Lumpur").fromNow();
};

export const initializeDate = (date: Date) => {
	if(!date) return null
	return moment(date).startOf("day").toDate()
}