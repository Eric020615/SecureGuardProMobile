import { View } from 'react-native'
import React from 'react'
import UserAvatar from 'react-native-user-avatar';

interface CustomUserAvatarProps {
    userName: string;
    size: number;
    bgColor: string;
}

const CustomUserAvatar = ({ userName, size, bgColor } : CustomUserAvatarProps) => {
	return (
		<View>
			<UserAvatar name={userName || 'User'} size={size} bgColor={bgColor} />
		</View>
	)
}

export default CustomUserAvatar
