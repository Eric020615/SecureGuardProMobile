import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { icons } from '@assets/index'
import PhoneInput, { ICountry } from 'react-native-international-phone-number'
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import CustomButton from '@components/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import { listOptions } from '@config/listOption'

export interface CustomPhoneInputProps extends CustomFormFieldProps {
	type: 'Phone'
	selectedCountryCode: ICountry
	setSelectedCountryCode: (e: ICountry) => void
	phoneNumber: string
	setPhoneNumber: (e: string) => void
}

export interface CustomTextInputProps extends CustomFormFieldProps {
	type: 'Text'
	textValue: string
	isSecureTextEntry?: boolean
	onChangeText: (e: any) => void
}

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown'
type AndroidMode = 'date' | 'time'
type Display = 'spinner' | 'default' | 'clock' | 'calendar'
type IOSDisplay = 'default' | 'compact' | 'inline' | 'spinner'
// type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30
// type DAY_OF_WEEK = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface CustomAndroidDateTimeInputProps extends CustomDateInputProps {
	platform: 'android'
	mode: AndroidMode
	display: Display
	is24Hour?: boolean
}

export interface CustomIOSDateTimeInputProps extends CustomDateInputProps {
	platform: 'ios'
	mode: IOSMode
	display: IOSDisplay
}

export interface CustomDateInputProps extends CustomFormFieldProps {
	type: 'DateTime'
	buttonContainerStyles?: string
	buttonTextStyles?: string
	buttonTitle: string
	timeZoneName: string
	minimumDate: Date
	maximumDate: Date
	selectedDate: Date
	showDateTime: boolean
	setShowDateTime: Dispatch<SetStateAction<boolean>>
	onChange: (event: DateTimePickerEvent, date?: Date) => void
}

export interface CustomPickerInputProps extends CustomFormFieldProps {
	type: 'Picker'
	selectedValue: any
	onValueChange: (e: any) => void
	items: listOptions[]
}

interface CustomFormFieldProps {
	title?: string
	placeholder?: any
	containerStyle?: string
	textStyle?: string
	onBlur?: (value?: any) => void
	errorMessage?: any
}

const CustomFormField = (
	props:
		| CustomPhoneInputProps
		| CustomTextInputProps
		| CustomAndroidDateTimeInputProps
		| CustomIOSDateTimeInputProps
		| CustomPickerInputProps,
) => {
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
							value={String(props.textValue)}
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
							maxLength={25}
							onChangeText={props.setPhoneNumber}
						/>
					</View>
				)
			case 'DateTime':
				const defineCalendar = () => {
					switch (props.platform) {
						case 'android':
							return (
								<DatePicker
									mode={props.mode}
									timeZoneName={props.timeZoneName}
									value={props.selectedDate}
									display={props.display}
									minimumDate={props.minimumDate}
									maximumDate={props.maximumDate}
									onChange={props.onChange}
									is24Hour={props.is24Hour}
								/>
							)
						case 'ios':
							return (
								<DatePicker
									className="justify-between ml-auto"
									mode={props.mode}
									timeZoneName={props.timeZoneName}
									value={props.selectedDate}
									display={props.display}
									minimumDate={props.minimumDate}
									maximumDate={props.maximumDate}
									onChange={props.onChange}
								/>
							)
					}
				}
				return (
					<>
						<View>
							<CustomButton
								containerStyles={`items-center flex-row justify-between h-fit bg-white p-4 mt-3 ${props.buttonContainerStyles}`}
								handlePress={() => {
									props.setShowDateTime(!props.showDateTime)
								}}
								title={props.buttonTitle}
								reactNativeIcons={
									<Iconicons name="caret-down" color={'#000000'} size={14} style={{}} />
								}
								textStyles={`text-sm text-black ml-auto mr-auto ${props.buttonTextStyles}`}
								iconStyles=""
							/>
							{props.showDateTime && defineCalendar()}
						</View>
					</>
				)
			case 'Picker':
				return (
					<View
						className={`w-full h-[50px] bg-white rounded-2xl focus:border-secondary`}
					>
						<Picker
							selectedValue={props.selectedValue}
							onValueChange={props.onValueChange}
							onBlur={props.onBlur}
						>
							{
								!props.selectedValue && (
									<Picker.Item label="Please select ..." value=""/>
								)
							}
							{props.items.map((x) => (
								<Picker.Item key={x.key} label={x.label} value={x.value} />
							))}
						</Picker>
					</View>
				)
		}
	}

	return (
		<View className={`space-y-2 ${props.containerStyle}`}>
			{props.title && (
				<Text className={`text-base text-black ${props.textStyle}`}>{props.title}</Text>
			)}
			{renderInput()}
			{props.errorMessage && <Text className="text-red-700 mx-2">{props.errorMessage}</Text>}
		</View>
	)
}

export default CustomFormField
