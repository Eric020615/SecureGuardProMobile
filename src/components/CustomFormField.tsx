import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@assets/index'
import PhoneInput from 'react-native-international-phone-number'

export interface CustomPhoneInputProps extends CustomFormFieldProps {
	type: "Phone"
	selectedCountryCode: any
	setSelectedCountryCode: (e: any) => void
	phoneNumber: any
	setPhoneNumber: (e: any) => void
}

export interface CustomTextInputProps extends CustomFormFieldProps {
	type: "Text"
	textValue: string
	isSecureTextEntry?: boolean
	onChangeText: (e: any) => void
}

interface CustomFormFieldProps {
	title?: string
	placeholder?: any
	containerStyle?: string
	textStyle?: string
	onBlur?: (value?: any) => void
	errorMessage?: any
}

const CustomFormField = (props: CustomPhoneInputProps | CustomTextInputProps ) => {
	const [showPassword, setShowPassword] = useState(false)
	const renderInput = () => {
		switch (props.type) {
			case 'Text':
				return (
					<View
						className={`w-full h-[50px] px-4 bg-white rounded-2xl focus:border-secondary items-center flex-row`}
					>
						<TextInput
							className="flex-1 text-black text-base"
							value={String()}
							placeholder={props.placeholder}
							placeholderTextColor="#7b7b8b"
							onChangeText={props.onChangeText}
							secureTextEntry={props.isSecureTextEntry && !showPassword}
							onBlur={props.onBlur}
							keyboardType={'default'}
						/>
						{props.isSecureTextEntry && (
							<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
								<Image
									source={!showPassword ? icons.eye : icons.eyeHide}
									className="w-6 h-6"
									resizeMode="contain"
								/>
							</TouchableOpacity>
						)}
					</View>
				)
			case 'Phone':
				return (
					<View
						className={`w-full h-[50px] bg-white rounded-2xl focus:border-secondary items-center flex-row`}
					>
						<PhoneInput
							phoneInputStyles={{
								container: {
									borderWidth: 0,
									backgroundColor: 'transparent',
								},
								flagContainer: {
									backgroundColor: 'transparent',
								},
							}}
							selectedCountry={props.selectedCountryCode ? props.selectedCountryCode : null}
							onChangeSelectedCountry={props.setSelectedCountryCode}
							onChangePhoneNumber={props.setPhoneNumber}
							value={props.phoneNumber}
							keyboardType="phone-pad"
						/>
					</View>
				)
		}
	}

	return (
		<View className={`space-y-2 ${props.containerStyle}`}>
			{props.title && <Text className={`text-base text-black ${props.textStyle}`}>{props.title}</Text>}
			{renderInput()}
			{props.errorMessage && <Text className="text-red-700">{props.errorMessage}</Text>}
		</View>
	)
}

export default CustomFormField
