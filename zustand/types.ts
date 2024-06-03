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
    facility: number;
    startDate: string;
    endDate: string;
    numOfGuest: number;
}

