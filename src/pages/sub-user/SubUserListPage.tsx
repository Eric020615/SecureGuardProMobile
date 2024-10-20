import { View, Text, ListRenderItem, ActivityIndicator, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomFlatList from '@components/list/CustomFlatList'
import { useApplication } from '@store/application/useApplication'
import { useUser } from '@store/user/useUser'
import { GetSubUserDto } from '@dtos/user/user.dto'

const SubUserListPage = () => {
	const isLoading = useApplication((state) => state.isLoading)
	const {
		subUsers,
		totalSubUsers,
		getSubUserListAction,
		resetSubUserListAction,
		deleteSubUserByIdAction,
		editSubUserStatusByIdAction,
	} = useUser()
	const [page, setPage] = useState(0)
	const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({})

	useEffect(() => {
		const initialStatuses = subUsers.reduce((acc, user) => {
			acc[user.userGuid] = user.status
			return acc
		}, {} as { [key: string]: boolean })
		setSwitchStates(initialStatuses)
	}, [subUsers])

	const toggleSwitch = async (userGuid: string) => {
		setSwitchStates((prev) => ({
			...prev,
			[userGuid]: !prev[userGuid], // Toggle the state for the specific user
		}))
		const response = await editSubUserStatusByIdAction(userGuid, !switchStates[userGuid])
		if (response?.success) {
			setPage(0)
			resetSubUserListAction()
			fetchSubUser()
		}
	}

	const renderItem: ListRenderItem<GetSubUserDto> = ({ item, index }) => {
		return (
			<View className="bg-white p-4 rounded-lg flex flex-row justify-between mb-2" key={index}>
				<View>
					{/* Sub-user information */}
					<Text className="font-bold text-lg">{item.userName}</Text>
					<Text className="text-gray-600">
						{item.firstName} {item.lastName}
					</Text>
					<Text className="text-gray-500">Contact: {item.contactNumber}</Text>
				</View>
				<View className="grid justify-between">
					<CustomButton
						handlePress={() => {
							deleteSubUserById(item.userGuid)
						}}
						rightReactNativeIcons={<Ionicons name="trash" color={'#000000'} size={24} />} // Trigger edit action
					/>
					<Switch
						trackColor={{ false: '#cccccc', true: '#1f5d50' }} // Neutral gray for off, lighter green for on
						thumbColor={switchStates[item.userGuid] ? '#d4f0e7' : '#f4f3f4'} // Light green or white when on, neutral when off
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => toggleSwitch(item.userGuid)}
						value={switchStates[item.userGuid] || false}
					/>
				</View>
			</View>
		)
	}

	const deleteSubUserById = async (subUserGuid: string) => {
		const response = await deleteSubUserByIdAction(subUserGuid)
		if (response?.success) {
			setPage(0)
			resetSubUserListAction()
			fetchSubUser()
		}
	}

	useEffect(() => {
		setPage(0)
		resetSubUserListAction()
		fetchSubUser()
	}, [])

	useEffect(() => {
		if(page == 0) {
			return
		}
		fetchSubUser()
	}, [page])

	const fetchSubUser = async () => {
		await getSubUserListAction(page, 10)
	}

	const fetchNextPage = async () => {
		if (isLoading || subUsers.length >= totalSubUsers) return
		setPage((prev) => prev + 1)
		// Logic to fetch the next page
		fetchSubUser() // Fetch the first page again
	}

	const onRefresh = async () => {
		if (isLoading == true) return
		// Logic to refresh data
		setPage(0)
		resetSubUserListAction()
		fetchSubUser() // Fetch the first page again
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
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
					<View className="flex-1 mt-4">
						<CustomFlatList<GetSubUserDto>
							data={subUsers}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={80} // Customize the item height if needed
							listFooterComponent={
								<View className="py-4 items-center">
									{isLoading && page > 0 ? (
										// Show a loading indicator while fetching more data
										<ActivityIndicator size="large" color="#0000ff" />
									) : subUsers.length < totalSubUsers ? (
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

export default SubUserListPage
