import { TouchableOpacity, Text, View } from 'react-native'
import React, { ReactElement } from 'react'

interface ButtonProps {
	title?: string
	handlePress: () => void
	containerStyles?: string
	textStyles?: string
	iconStyles?: string
	isLoading?: boolean
	rightReactNativeIcons?: ReactElement
	leftReactNativeIcons?: ReactElement
	testId?: string
}

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	iconStyles,
	isLoading,
	rightReactNativeIcons,
	leftReactNativeIcons,
	testId,
}: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`rounded-xl justify-center 
      		items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
			disabled={isLoading}
			testID={testId}
		>
			{leftReactNativeIcons ? (
				<View className={`${iconStyles}`}>{leftReactNativeIcons}</View>
			) : null}
			{title && (
				<Text className={`text-white font-psemibold text-lg self-center ${textStyles}`}>
					{title}
				</Text>
			)}
			{rightReactNativeIcons ? (
				<View className={`${iconStyles}`}>{rightReactNativeIcons}</View>
			) : null}
		</TouchableOpacity>
	)
}

export default CustomButton
