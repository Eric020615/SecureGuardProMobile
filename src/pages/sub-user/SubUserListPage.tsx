import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomModal from '@components/modals/CustomModal'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SubUserListPage = () => {
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<CustomModal />
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center justify-between">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/sub-user/create')
							}}
							rightReactNativeIcons={<Ionicons name="add-circle" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Sub-user</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default SubUserListPage
