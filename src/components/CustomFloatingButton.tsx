import { View, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

interface CustomFloatingButtonProps {
    handlePress: () => void;
    containerStyles?: string;
    reactNativeIcons?: ReactElement;
}

const CustomFloatingButton = ({handlePress, containerStyles, reactNativeIcons} : CustomFloatingButtonProps) => {
	return (
		<View className='flex-1'>
			<TouchableOpacity
                className={containerStyles}
                onPress={handlePress}>
                {reactNativeIcons}
            </TouchableOpacity>
		</View>
	)
}

export default CustomFloatingButton
