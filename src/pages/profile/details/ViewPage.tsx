import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '@store/user/useUser'
import UserAvatar from '@bhavberi/react-native-user-avatar/src'
import CustomButton from '@components/buttons/CustomButton'
import { RoleDescriptionEnum } from '@config/constant/user'

const userProfileViewPage = () => {
	const { userProfile, getUserProfileByIdAction } = useUser()

	const handleEditProfile = () => {
		router.push({
			pathname: '/(tabs)/profile/[pageMode]',
			params: { pageMode: 'edit' },
		})
	}

	const logOut = async () => {
		try {
			await AsyncStorage.clear()
			router.replace('/sign-in')
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
					{/* Avatar and Edit Icon */}
					<View className="relative">
						<UserAvatar name={userProfile.userName || 'User'} size={100} round={true} bgColor="#10312b" />
						<TouchableOpacity
							className="absolute bottom-0 right-0 bg-white border-primary p-2 rounded-full shadow-md"
							onPress={handleEditProfile}
						>
							<Ionicons name="pencil" size={20} color="#000" />
						</TouchableOpacity>
					</View>

					{/* User Information */}
					{userProfile && (
						<>
							<View className="mt-3">
								<Text className="text-3xl text-black font-semibold">{userProfile.userName || ''}</Text>
							</View>
							<View>
								<Text className="text-base text-gray-500 font-semibold">{userProfile.email || ''}</Text>
							</View>
							<View>
								<Text className="text-base text-gray-500 font-semibold">{RoleDescriptionEnum[userProfile.role]}</Text>
							</View>
						</>
					)}

					{/* Preferences Section */}
					<View className="mt-2 w-full">
						<Text className="text-base text-gray-500 font-semibold">Preferences</Text>
						<CustomButton
							title="Sub-user"
							handlePress={() => {
								router.push('/sub-user')
							}}
							containerStyles="bg-gray-200 p-2 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<Ionicons name="settings" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={<Ionicons name="chevron-forward" color={'#000000'} size={24} />}
						/>
						<CustomButton
							title="Face ID"
							handlePress={() => {
								router.push('/face-auth')
							}}
							containerStyles="bg-gray-200 p-2 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<MaterialCommunityIcons name="face-recognition" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={<Ionicons name="chevron-forward" color={'#000000'} size={24} />}
						/>
						<CustomButton
							title="Card"
							handlePress={() => {
								router.push('/card')
							}}
							containerStyles="bg-gray-200 p-2 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<MaterialCommunityIcons name="card-account-details-outline" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={<Ionicons name="chevron-forward" color={'#000000'} size={24} />}
						/>
						<CustomButton
							title="Password"
							handlePress={() => {
								router.push('/reset-password')
							}}
							containerStyles="bg-gray-200 p-2 mt-2 w-full rounded-3xl flex flex-row justify-start"
							textStyles="text-base text-black flex-1"
							leftReactNativeIcons={
								<View className="mr-4 bg-white p-1 rounded-xl">
									<MaterialCommunityIcons name="form-textbox-password" color={'#000000'} size={24} />
								</View>
							}
							rightReactNativeIcons={<Ionicons name="chevron-forward" color={'#000000'} size={24} />}
						/>
						<CustomButton
							title="Logout"
							handlePress={() => {
								logOut()
							}}
							containerStyles="bg-gray-200 p-2 mt-2 w-full rounded-3xl flex flex-row justify-start"
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
