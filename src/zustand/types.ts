export interface UserInformationFormDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    unitNumber: string;
    birthDay: string;
    gender: string;
}

export interface UserSignUpFormDto {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInFormDto {
    email: string;
    password: string;
}

export interface FacilityBookingFormDto {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
}

export interface getFacilityBookingHistoryDto {
    bookingId: string
    startDate: string
    facilityId: string
    facilityName: string
    endDate: string
    bookedBy: string
    numOfGuest: number
    isCancelled: boolean
    cancelRemark: string
    createdBy: string;
    createdDateTime: string;
    updatedBy: string;
    updatedDateTime: string;
}

export interface cancelFacilityBookingDto {
    cancelRemark: string
}

export interface getNoticeDto {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}