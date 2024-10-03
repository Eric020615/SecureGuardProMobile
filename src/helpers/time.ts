import moment from 'moment-timezone'

export const convertDateStringToDate = (dateString: string) => {
	if (!dateString) return
	const date = moment(dateString).tz('Asia/Kuala_Lumpur').toDate()
	return date
}

export const convertUTCStringToLocalDateString = (UTCString: string, dateFormat: string) => {
	if (!UTCString) return
	const localDateString = moment.utc(UTCString).tz('Asia/Kuala_Lumpur').format(dateFormat)
	return localDateString
}

export const convertUTCStringToLocalDate = (UTCString: string) => {
	if (!UTCString) return
	const localDate = moment.utc(UTCString).tz('Asia/Kuala_Lumpur').toDate()
	return localDate
}

export const getTodayDate = () => {
	const todayDate = moment().tz('Asia/Kuala_Lumpur').toDate()
	return todayDate
}

export const getLocalDateString = (date: Date, dateFormat: string) => {
	if (date === null) return ''
	const dateString = moment(date).tz('Asia/Kuala_Lumpur').format(dateFormat)
	return dateString
}

export const getUTCDateString = (date: Date, dateFormat: string) => {
	if (date === null) return ''
	const dateString = moment(date).utc().format(dateFormat)
	return dateString
}

export const getUTCRelativeTimeFromNow = (date: Date) => {
	if (date === null) return ''
	const relativeTime = moment.utc(date).tz('Asia/Kuala_Lumpur').fromNow()
	return relativeTime
}

export const formatDateString = (dateString: string, dateFormat: string) => {
	if (dateString === null) return ''
	const localDateString = moment(dateString).tz('Asia/Kuala_Lumpur').format(dateFormat)
	return localDateString
}