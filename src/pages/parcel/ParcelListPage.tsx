import { View, Text, TouchableOpacity, ListRenderItem, ActivityIndicator, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ITimeFormat } from '@config/constant'
import CustomFlatList from '@components/list/CustomFlatList'
import { useParcel } from '@store/parcel/useParcel'
import { useApplication } from '@store/application/useApplication'
import { GetParcelDto } from '@dtos/parcel/parcel.dto'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { convertDateStringToFormattedString } from '@helpers/time'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ParcelListPage = () => {
	const { parcels, id, totalParcels, getParcelsAction, resetParcelAction } = useParcel()
	const { isLoading } = useApplication()

	useEffect(() => {
		resetParcelAction()
		fetchParcel()
	}, [])

	const fetchParcel = async () => {
		await getParcelsAction(10)
	}

	const fetchNextPage = async () => {
		if (isLoading || parcels.length >= totalParcels) return
		fetchParcel()
	}
	const onRefresh = async () => {
		if (isLoading == true) return
		resetParcelAction()
		fetchParcel()
	}

	const renderItem: ListRenderItem<GetParcelDto> = ({ item, index }) => (
		<TouchableOpacity
			className="bg-white p-4 rounded-lg flex flex-row items-center space-x-4"
			key={index}
			onPress={() => {
				router.push(`/parcel/${item.parcelGuid}`)
			}}
		>
			{/* Display Parcel Image */}
			<View className="w-16 h-16 rounded-lg overflow-hidden">
				{item.parcelImage ? (
					<Image source={{ uri: item.parcelImage.fileUrl }} className="w-full h-full" resizeMode="cover" />
				) : (
					<View className="w-full h-full bg-gray-200 flex items-center justify-center">
						<AntDesign name="picture" size={24} color="#ccc" />
					</View>
				)}
			</View>

			{/* Display Parcel Information */}
			<View className="flex-1">
				<Text className="text-gray-500">{`Floor: ${item.floor}, Unit: ${item.unit}`}</Text>
				<View className="flex flex-row items-center space-x-1 mt-2">
					<AntDesign name="clockcircle" color="#10312b" size={16} />
					<Text className="font-bold">
						{convertDateStringToFormattedString(item.createdDateTime, ITimeFormat.dateTime)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">My Parcel</Text>
					<View className="flex-1 mt-4">
						<CustomFlatList<GetParcelDto>
							data={parcels}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={120} // Customize the item height if needed
							listFooterComponent={
								<View className="py-4 items-center">
									{isLoading && id > 0 ? (
										// Show a loading indicator while fetching more data
										<ActivityIndicator size="large" color="#0000ff" />
									) : parcels.length < totalParcels ? (
										<Text className="text-gray-500">Load More</Text>
									) : (
										// Show a message when all data is loaded
										<Text className="text-gray-500">You've reached the end of the list.</Text>
									)}
								</View>
							}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default ParcelListPage
