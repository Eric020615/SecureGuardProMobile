export enum FacilityDescriptionEnum {
	BC = 'Badminton Court',
	BBC = 'Basketball Court',
	GR = 'Gym Room',
}

export const facilityBookingSlotCheckConst = {
	facility: 'BC' as keyof typeof FacilityDescriptionEnum,
	startDate: null,
	duration: null,
	numOfGuest: null,
}

export const facilityBookingSubmissionConst = {
	facility: '',
	startDate: null,
	endDate: null,
	numOfGuest: null,
	space: '',
}
