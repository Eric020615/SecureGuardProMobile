export interface UserInformationForm {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    unitNumber: string;
    birthDay: string;
    gender: string;
}

export interface UserSignUpForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInForm {
    email: string;
    password: string;
}

export interface FacilityBookingForm {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
}

export interface getBookingHistory {
    bookingId: string;
    facilityId: number;
    startDate: string;
    endDate: string;
    numOfGuest: number;
    userGUID: string;
    isCancelled: boolean
}

export interface getNotice {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}