import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { convertUTCStringToLocalDateString } from '../../../helpers/time'
import { useUser } from '@zustand/user/useUser'
import { GenderConst } from '@config/constant/user'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@zustand/index'
import { GetUserProfileByIdDto } from '@zustand/types'

const ProfileDetailsViewPage = () => {
    const { getUserProfileByIdAction } = useUser();
	const [profileDetails, setProfileDetails] = useState<GetUserProfileByIdDto>()
	const { setIsLoading } = useApplication()

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
				<View className="w-full min-h-[85vh] px-4 my-6">
					<Text className="text-4xl text-black font-bold mt-6">User Details</Text>
					{profileDetails && (
						<>
							{/* Existing Fields */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">First Name</Text>
								<Text className="text-base text-black">
									{profileDetails.firstName ? profileDetails.firstName : ''}
								</Text>
							</View>
                            <View className="mt-3">
								<Text className="text-lg text-black font-bold">Last Name</Text>
								<Text className="text-base text-black">
									{profileDetails.lastName ? profileDetails.lastName : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Contact Number</Text>
								<Text className="text-base text-black">
									{profileDetails.contactNumber ? profileDetails.contactNumber : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Gender</Text>
								<Text className="text-base text-black">
									{GenderConst[profileDetails.gender]}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">DOB</Text>
								<Text className="text-base text-black">
									{profileDetails.dateOfBirth ? convertUTCStringToLocalDateString(profileDetails.dateOfBirth, ITimeFormat.date) : ''}
								</Text>
							</View>

							{/* New Fields */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Username</Text>
								<Text className="text-base text-black">
									{profileDetails.userName ? profileDetails.userName : ''}
								</Text>
							</View>
                            <View className="mt-3">
								<Text className="text-lg text-black font-bold">Email</Text>
								<Text className="text-base text-black">
									{profileDetails.email ? profileDetails.email : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Role</Text>
								<Text className="text-base text-black">
									{profileDetails.role}
								</Text>
							</View>
                            <View className="mt-3">
								<Text className="text-lg text-black font-bold">Floor</Text>
								<Text className="text-base text-black">
									{profileDetails.roleInformation ? profileDetails.roleInformation.floorNumber : ''}
								</Text>
							</View>
                            <View className="mt-3">
								<Text className="text-lg text-black font-bold">Unit</Text>
								<Text className="text-base text-black">
									{profileDetails.roleInformation ? profileDetails.roleInformation.unitNumber : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Created By</Text>
								<Text className="text-base text-black">
									{profileDetails.createdBy ? profileDetails.createdBy : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Created Date</Text>
								<Text className="text-base text-black">
									{profileDetails.createdDateTime ? convertUTCStringToLocalDateString(profileDetails.createdDateTime, ITimeFormat.date) : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Updated By</Text>
								<Text className="text-base text-black">
									{profileDetails.updatedBy ? profileDetails.updatedBy : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Updated Date</Text>
								<Text className="text-base text-black">
									{profileDetails.updatedDateTime ? convertUTCStringToLocalDateString(profileDetails.updatedDateTime, ITimeFormat.date) : ''}
								</Text>
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ProfileDetailsViewPage
