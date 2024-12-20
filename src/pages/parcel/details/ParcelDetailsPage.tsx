import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomButton from '@components/buttons/customButton/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { convertDateStringToFormattedString } from '@helpers/time'
import { ITimeFormat } from '@config/constant'
import { useParcel } from '@store/parcel/useParcel'
import { ParcelStatusDescriptionEnum } from '@config/constant/parcel'

const ParcelDetailsPage = () => {
	const { width } = Dimensions.get('window') // Get full screen width
	const imageHeight = (width * 9) / 16 // 16:9 ratio
	const { parcelDetails, getParcelDetailsByIdAction } = useParcel()
	const { id } = useLocalSearchParams()

	useEffect(() => {
		fetchParcelDetailsById(id as string)
	}, [id])

	const fetchParcelDetailsById = async (id: string) => {
		await getParcelDetailsByIdAction(id)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/parcel')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Parcel Details</Text>

					{/* Parcel Image */}
					{parcelDetails?.parcelImage?.fileUrl ? (
						<View className="w-full rounded-lg overflow-hidden mt-2" style={{ height: imageHeight }}>
							<Image source={{ uri: parcelDetails.parcelImage.fileUrl }} className="w-full h-full" resizeMode="cover" />
						</View>
					) : (
						<Text className="text-center text-gray-500 mt-4">No image available</Text>
					)}

					{parcelDetails ? (
						<View className="mt-2">
							{/* Parcel GUID */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Parcel Id</Text>
								<Text className="text-base text-black">{parcelDetails.parcelGuid || 'N/A'}</Text>
							</View>

							{/* Floor */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Floor</Text>
								<Text className="text-base text-black">{parcelDetails.floor || 'N/A'}</Text>
							</View>

							{/* Unit */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Unit</Text>
								<Text className="text-base text-black">{parcelDetails.unit || 'N/A'}</Text>
							</View>

							{/* Created On */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Date of Arrival</Text>
								<Text className="text-base text-black">
									{parcelDetails.createdDateTime
										? convertDateStringToFormattedString(parcelDetails.createdDateTime, ITimeFormat.dateTime)
										: 'N/A'}
								</Text>
							</View>

							{/* Parcel Status */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Parcel Status</Text>
								<Text className="text-base text-black">
									{ParcelStatusDescriptionEnum[parcelDetails.parcelStatus] || 'N/A'}
								</Text>
							</View>
						</View>
					) : (
						<Text className="text-center text-gray-500 mt-10">Loading parcel details...</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ParcelDetailsPage
