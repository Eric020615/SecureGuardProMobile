import { View, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

interface CustomFloatingButtonProps {
    handlePress: () => void;
    containerStyles?: string;
    reactNativeIcons?: ReactElement;
    testId?: string;
}

const CustomFloatingButton = ({handlePress, containerStyles, reactNativeIcons, testId} : CustomFloatingButtonProps) => {
	return (
		<View className='flex-1'>
			<TouchableOpacity
                className={containerStyles}
                onPress={handlePress}
                testID={testId}>
                {reactNativeIcons}
            </TouchableOpacity>
		</View>
	)
}

export default CustomFloatingButton
