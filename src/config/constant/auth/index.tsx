import { RoleEnum } from "../user"

export const signUpformDataJson = {
    email: "",
    password: "",
    confirmPassword: ""
}

export const userInforformDataJson = {
    firstName: '',
    lastName: '',
    userName: '',
    countryCode: null,
    phoneNumber: '',
    gender: '',
    floor: '',
    unitNumber: '',
    dateOfBirth: null
}

export const signInformDataJson = {
    email: "",
    password: "",
    role: [RoleEnum.RESIDENT, RoleEnum.RESIDENT_SUBUSER], // Default value
}