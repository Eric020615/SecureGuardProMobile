import { RoleEnum } from "@config/constant/user"

export interface UserSignUpFormDto {
	email: string
	password: string
	confirmPassword: string
}

export interface SignInFormDto {
	email: string
	password: string
	notificationToken?: string
}

export interface ForgotPasswordDto {
	email: string
}

export interface ResetPasswordDto {
	currentPassword: string
	newPassword: string
}

export interface AuthTokenPayloadDto {
	userGuid: string
	role: RoleEnum
}
