export enum FacilityEnum {
	BC = 'Badminton Court',
	BBC = 'Basketball Court',
	GR = 'Gym Room',
}

export const facilityBookingSlotCheckConst = {
	facilityId: 'BC' as keyof typeof FacilityEnum,
	startDate: null,
	duration: null,
	numOfGuest: null,
}

export const facilityBookingSubmissionConst = {
	facilityId: '',
	startDate: null,
	endDate: null,
	numOfGuest: null,
	space: '',
}
