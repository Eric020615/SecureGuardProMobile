import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { convertUTCStringToLocalDateString } from '../../../helpers/time'
import { useUser } from '@zustand/user/useUser'
import { GenderConst, RoleConst } from '@config/constant/user'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@zustand/index'
import { GetUserProfileByIdDto } from '@zustand/types'
import { images, icons } from '@assets/index'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileDetailsViewPage = () => {
	const { getUserProfileByIdAction } = useUser()
	const [profileDetails, setProfileDetails] = useState<GetUserProfileByIdDto>()
	const { setIsLoading } = useApplication()
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
		getData()
	}, [])

	const getData = async () => {
		try {
			setIsLoading(true)
			const response = await getUserProfileByIdAction()
			if (response.success) {
				setProfileDetails(response.data)
			} else {
				console.log(response.msg)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 py-4 my-8 justify-center items-center">
					<View>
						<Image source={images.sampleAvatar} className="w-24 h-24" />
					</View>
					{profileDetails && (
						<>
							{/* Existing Fields */}
							<View className="mt-3">
								<Text className="text-3xl text-black font-semibold">
									{profileDetails.userName ? profileDetails.userName : ''}
								</Text>
							</View>
							<View>
								<Text className="text-base text-gray-500 font-semibold">
									{profileDetails.email ? profileDetails.email : ''}
								</Text>
							</View>
							<View>
								<Text className="text-base text-gray-500 font-semibold">
									{RoleConst[profileDetails.role]}
								</Text>
							</View>
						</>
					)}
					<CustomButton
						title="Edit Profile"
						handlePress={() => {
							handlePress()
						}}
						containerStyles="bg-primary p-4 mt-4 self-center rounded-3xl"
						textStyles="text-base text-white"
					/>
					<View className="mt-5 px-2 w-full">
						<Text className="text-base text-gray-500 font-semibold">Preferences</Text>
						<CustomButton
							title="Settings"
							handlePress={() => {}}
							containerStyles="bg-gray-200 p-4 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-2 rounded-xl">
									<Ionicons name="settings" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={
								<Ionicons name="chevron-forward" color={'#000000'} size={24} />
							}
						/>
						<CustomButton
							title="Settings"
							handlePress={() => {}}
							containerStyles="bg-gray-200 p-4 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-2 rounded-xl">
									<Ionicons name="settings" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={
								<Ionicons name="chevron-forward" color={'#000000'} size={24} />
							}
						/>
						<CustomButton
							title="Settings"
							handlePress={() => {}}
							containerStyles="bg-gray-200 p-4 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-2 rounded-xl">
									<Ionicons name="settings" color={'#000000'} size={24} />
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
							containerStyles="bg-gray-200 p-4 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-red-600 flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-2 rounded-xl">
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

export default ProfileDetailsViewPage
