import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { icons } from '@assets/index'
import PhoneInput, { ICountry } from 'react-native-international-phone-number'
import DatePicker from 'react-native-date-picker'
import CustomButton from '@components/buttons/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import { listOptions } from '@config/listOption'
import { DocumentPickerResponse } from 'react-native-document-picker'

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

export interface CustomDateInputProps extends CustomFormFieldProps {
	type: 'DateTime'
	buttonContainerStyles?: string
	buttonTextStyles?: string
	buttonTitle: string
	mode: 'date' | 'time' | 'datetime'
	minimumDate?: Date
	maximumDate?: Date
	selectedDate: Date
	showDateTime: boolean
	setShowDateTime: Dispatch<SetStateAction<boolean>>
	onChange: (date?: Date) => void
}

export interface CustomPickerInputProps extends CustomFormFieldProps {
	type: 'Picker'
	selectedValue: any
	onValueChange: (e: any) => void
	items: listOptions[]
}

export interface CustomFilePickerInputProps extends CustomFormFieldProps {
	type: 'FilePicker'
	selectedFiles: DocumentPickerResponse[]
	onFileChanged: () => Promise<void>
	clearFile: () => void
}

interface CustomFormFieldProps {
	title?: string
	placeholder?: any
	containerStyle?: string
	textStyle?: string
	onBlur?: (value?: any) => void
	errorMessage?: any
}

const CustomFormFieldStyled = {
	container: 'w-full h-[45px] bg-white rounded-2xl focus:border-secondary mt-2',
	input: 'w-full h-[45px] rounded-xl bg-white focus:border-secondary items-center flex-row px-4',
	button: 'items-center flex-row justify-between h-[45px] bg-white py-2 px-4 mt-2',
	textInput: 'flex-1 text-black text-base',
	placeholderText: 'text-sm text-black',
	iconSize: 'w-6 h-6',
}

const CustomFormField = (
	props:
		| CustomPhoneInputProps
		| CustomTextInputProps
		| CustomDateInputProps
		| CustomPickerInputProps
		| CustomFilePickerInputProps,
) => {
	const [showPassword, setShowPassword] = useState(false)
	const renderInput = () => {
		switch (props.type) {
			case 'Text':
				return (
					<View className={`${CustomFormFieldStyled.input}`}>
						<TextInput
							className={CustomFormFieldStyled.textInput}
							value={String(props.textValue)}
							placeholder={props.placeholder}
							placeholderTextColor="#7b7b8b"
							onChangeText={props.onChangeText}
							secureTextEntry={props.isSecureTextEntry && !showPassword}
							onBlur={props.onBlur}
							keyboardType="default"
						/>
						{props.isSecureTextEntry && (
							<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
								<Image
									source={!showPassword ? icons.eye : icons.eyeHide}
									className={CustomFormFieldStyled.iconSize}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						)}
					</View>
				)
			case 'Phone':
				return (
					<View className={`${CustomFormFieldStyled.input} px-0`}>
						<PhoneInput
							phoneInputStyles={{
								container: { borderWidth: 0, backgroundColor: 'transparent' },
								flagContainer: { backgroundColor: 'transparent' },
							}}
							defaultCountry="MY"
							selectedCountry={props.selectedCountryCode ? props.selectedCountryCode : null}
							onChangeSelectedCountry={props.setSelectedCountryCode}
							onChangePhoneNumber={props.setPhoneNumber}
							value={props.phoneNumber}
							keyboardType="phone-pad"
							maxLength={25}
							onBlur={props.onBlur}
							placeholder={props.placeholder}
							onChangeText={props.setPhoneNumber}
						/>
					</View>
				)
			case 'DateTime':
				return (
					<>
						<CustomButton
							containerStyles={`${CustomFormFieldStyled.button} ${props.buttonContainerStyles}`}
							handlePress={() => props.setShowDateTime(!props.showDateTime)}
							title={props.buttonTitle ? props.buttonTitle : props.placeholder}
							rightReactNativeIcons={<Iconicons name="caret-down" color={'#000000'} size={14} />}
							textStyles={`${CustomFormFieldStyled.placeholderText} ${props.buttonTextStyles} font-pmedium`}
						/>
						<DatePicker
							modal
							open={props.showDateTime}
							date={props.selectedDate}
							onConfirm={props.onChange}
							onCancel={() => props.setShowDateTime(!props.showDateTime)}
							timeZoneOffsetInMinutes={8 * 60}
							mode={props.mode}
							minimumDate={props.minimumDate}
							maximumDate={props.maximumDate}
						/>
					</>
				)
			case 'Picker':
				return (
					<View className={`${CustomFormFieldStyled.container} justify-center`}>
						<Picker
							selectedValue={props.selectedValue}
							onValueChange={props.onValueChange}
							onBlur={props.onBlur}
						>
							{!props.selectedValue && <Picker.Item label={props.placeholder} value="" />}
							{props.items.map((x) => (
								<Picker.Item key={x.key} label={x.label} value={x.value} />
							))}
						</Picker>
					</View>
				)
			case 'FilePicker':
				return (
					<View className={`${CustomFormFieldStyled.container} flex flex-row items-center`}>
						{props.selectedFiles.length > 0 ? (
							<>
								<CustomButton
									handlePress={props.clearFile}
									containerStyles="mx-5"
									rightReactNativeIcons={
										<Iconicons name="close-circle" color={'#10312b'} size={30} />
									}
								/>
								<View className="flex flex-col">
									{props.selectedFiles.map((selectedFile, id) => (
										<Text key={id}>{selectedFile.name}</Text>
									))}
								</View>
							</>
						) : (
							<>
								<CustomButton
									title="Choose File"
									handlePress={props.onFileChanged}
									textStyles="text-white text-sm"
									containerStyles="bg-primary px-2 mx-5"
								/>
								<Text>No File Selected</Text>
							</>
						)}
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
