import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@assets/index'
import PhoneInput from 'react-native-international-phone-number'

export interface CustomPhoneInputProps {
	type: 'Phone'
	selectedCountryCode: any
	setSelectedCountryCode: (e: any) => void
	phoneNumber: any
	setPhoneNumber: (e: any) => void
	contactNumber: any
}

export interface CustomTextInputProps {
	type: 'Text'
	textValue: string
	isSecureTextEntry?: boolean
	onChangeText: (e: any) => void
}

export interface CustomInputProps {
  type: 'Text' | 'Phone'
}

interface CustomFormFieldProps {
	title?: string
	placeholder?: any
	containerStyle?: string
	textStyle?: string
	onBlur?: (value?: any) => void
	errorMessage?: any
	inputProps?: CustomPhoneInputProps | CustomTextInputProps
}

const CustomFormField = ({
	title,
	placeholder,
	containerStyle,
	textStyle,
	onBlur,
	errorMessage,
	inputProps,
}: CustomFormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false)
  console.log("type123" + inputProps.type)
	const renderInput = () => {
		switch (inputProps.type) {
			case 'Text':
        console.log("alksjl" + inputProps.textValue)
				return (
					<View
						className={`w-full h-[50px] px-4 
          bg-white rounded-2xl focus:border-secondary items-center 
            flex-row`}
					>
						<TextInput
							className="flex-1 text-black text-base"
							value={String(inputProps.textValue)}
							placeholder={placeholder}
							placeholderTextColor="#7b7b8b"
							onChangeText={inputProps.onChangeText}
							secureTextEntry={inputProps.isSecureTextEntry && !showPassword}
							onBlur={onBlur}
              keyboardType={'default'}
						/>
						{inputProps.isSecureTextEntry && (
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
						className={`w-full h-[50px] px-4 
          bg-white rounded-2xl focus:border-secondary items-center 
            flex-row`}
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
							selectedCountry={inputProps.selectedCountryCode}
							onChangeSelectedCountry={inputProps.setSelectedCountryCode}
							onChangePhoneNumber={inputProps.setPhoneNumber}
							value={inputProps.contactNumber}
							keyboardType="phone-pad"
						/>
					</View>
				)
		}
	}

	return (
		<View className={`space-y-2 ${containerStyle}`}>
			{title && <Text className={`text-base text-black ${textStyle}`}>{title}</Text>}
			{renderInput()}
			{errorMessage && <Text className="text-red-700">{errorMessage}</Text>}
		</View>
	)
}

export default CustomFormField
