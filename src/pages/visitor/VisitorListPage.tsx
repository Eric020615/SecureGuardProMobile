import { View, Text, TouchableOpacity, ListRenderItem, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import { VisitorEnum } from '@config/constant/visitor'
import { router } from 'expo-router'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ITimeFormat } from '@config/constant'
import CustomFlatList from '@components/list/CustomFlatList'
import { useVisitor } from '@store/visitor/useVisitor'
import { useApplication } from '@store/application/useApplication'
import { GetVisitorDto } from '@dtos/visitor/visitor.dto'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { convertDateStringToFormattedString } from '@helpers/time'

const VisitorListPage = () => {
	const [isPast, setIsPast] = useState(true)
	const { visitors, totalVisitors, getVisitorsAction, resetVisitorAction } = useVisitor()
	const { isLoading } = useApplication()
	const [page, setPage] = useState(0)

	useEffect(() => {
		setPage(0)
		resetVisitorAction()
		fetchVisitor()
	}, [isPast]) // Dependency on isPast to refetch data

	useEffect(() => {
		if (page == 0) {
			return
		}
		fetchVisitor()
	}, [page])

	const fetchVisitor = async () => {
		await getVisitorsAction(isPast, page, 10)
	}

	const fetchNextPage = async () => {
		if (isLoading || visitors.length >= totalVisitors) return
		setPage((prev) => prev + 1)
	}
	const onRefresh = async () => {
		if (isLoading == true) return
		setPage(0)
		resetVisitorAction()
		fetchVisitor() // Fetch the first page again
	}

	const renderItem: ListRenderItem<GetVisitorDto> = ({ item, index }) => (
		<TouchableOpacity
			className="bg-white p-4 rounded-lg flex flex-row justify-between"
			key={index}
			onPress={() => {
				router.push(`/visitor/visitorDetails/${item.visitorGuid}/view`)
			}}
		>
			<View className="grid gap-1">
				<Text className="font-bold text-lg">{item.visitorName}</Text>
				<Text className="text-gray-500 font-semibold">
					{VisitorEnum[item.visitorCategory] ? VisitorEnum[item.visitorCategory] : 'others'}
				</Text>
				<View className="flex flex-row gap-1 items-center">
					<AntDesign name="clockcircle" color="#10312b" size={16} />
					<Text className="font-bold">
						{convertDateStringToFormattedString(item.visitDateTime, ITimeFormat.dateTime)}
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
					<Text className="text-4xl text-black font-bold mt-6">My Visitor</Text>
					<View className="flex flex-row justify-between mt-5">
						<CustomButton
							containerStyles={`${isPast ? 'bg-primary' : 'bg-white'} p-2 mr-5 flex-1 rounded-2xl`}
							handlePress={() => {
								setIsPast(!isPast)
							}}
							title="Past"
							textStyles={`text-base ${isPast ? 'text-white' : 'text-primary'} `}
						/>
						<CustomButton
							containerStyles={`${!isPast ? 'bg-primary' : 'bg-white'} p-2 flex-1 rounded-2xl`}
							handlePress={() => {
								setIsPast(!isPast)
							}}
							title="Upcoming"
							textStyles={`text-base ${!isPast ? 'text-white' : 'text-primary'} `}
						/>
					</View>
					<View className="flex-1 mt-4">
						<CustomFlatList<GetVisitorDto>
							data={visitors}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={120} // Customize the item height if needed
							listFooterComponent={
								<View className="py-4 items-center">
									{isLoading && page > 0 ? (
										// Show a loading indicator while fetching more data
										<ActivityIndicator size="large" color="#0000ff" />
									) : visitors.length < totalVisitors ? (
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

export default VisitorListPage
