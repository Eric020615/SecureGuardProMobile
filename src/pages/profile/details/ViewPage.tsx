import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RoleConst } from '@config/constant/user'
import { images } from '@assets/index'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { router, usePathname } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '@store/user/useUser'

const userProfileViewPage = () => {
	const { userProfile, getUserProfileByIdAction } = useUser()
	const currentPath = usePathname()
	const handlePress = () => {
		if (currentPath.includes('view')) {
			router.push(currentPath.replace('view', 'edit'))
			return
		}
		router.push(currentPath.concat('/edit'))
	}
	const logOut = async () => {
		try {
			await AsyncStorage.clear()
			router.push('/sign-in')
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchUserProfileByUserId()
	}, [])

	const fetchUserProfileByUserId = async () => {
		await getUserProfileByIdAction()
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 py-4 my-4 justify-center items-center">
					<View>
						<Image source={images.sampleAvatar} className="w-24 h-24" />
					</View>
					{userProfile && (
						<>
							<View className="mt-3">
								<Text className="text-3xl text-black font-semibold">
									{userProfile.userName ? userProfile.userName : ''}
								</Text>
							</View>
							<View>
								<Text className="text-base text-gray-500 font-semibold">
									{userProfile.email ? userProfile.email : ''}
								</Text>
							</View>
							<View>
								<Text className="text-base text-gray-500 font-semibold">
									{RoleConst[userProfile.role]}
								</Text>
							</View>
						</>
					)}
					<CustomButton
						title="Edit Profile"
						handlePress={() => {
							handlePress()
						}}
						containerStyles="bg-primary p-3 mt-4 self-center rounded-full h-fit"
						textStyles="text-base text-white"
					/>
					<View className="mt-2 w-full">
						<Text className="text-base text-gray-500 font-semibold">Preferences</Text>
						<CustomButton
							title="Sub-user"
							handlePress={() => {
								router.push('/sub-user')
							}}
							containerStyles="bg-gray-200 p-3 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<Ionicons name="settings" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={
								<Ionicons name="chevron-forward" color={'#000000'} size={24} />
							}
						/>
						<CustomButton
							title="Face ID"
							handlePress={() => {
								router.push('/camera')
							}}
							containerStyles="bg-gray-200 p-3 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<MaterialCommunityIcons name="face-recognition" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={
								<Ionicons name="chevron-forward" color={'#000000'} size={24} />
							}
						/>
						<CustomButton
							title="Password"
							handlePress={() => {}}
							containerStyles="bg-gray-200 p-3 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<MaterialCommunityIcons
										name="form-textbox-password"
										color={'#000000'}
										size={24}
									/>
								</View>
							}
							rightReactNativeIcons={
								<Ionicons name="chevron-forward" color={'#000000'} size={24} />
							}
						/>
						<CustomButton
							title="Logout"
							handlePress={() => {
								logOut()
							}}
							containerStyles="bg-gray-200 p-3 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-red-600 flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<Ionicons name="exit-outline" color={'#FF0000'} size={24} />
								</View>
							}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default userProfileViewPage
