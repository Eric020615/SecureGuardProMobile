import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNotice } from '@zustand/notice/useNotice'
import { getNoticeDto } from '@zustand/types'
import moment from 'moment'
import 'moment-timezone'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { useApplication } from '@zustand/index'

const NoticeListPage = () => {
	const { getNotice } = useNotice()
	const { setIsLoading } = useApplication()
	const [notice, setNotice] = useState<getNoticeDto[]>([])

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			setIsLoading(true)
			const response = await getNotice()
			if (response.success) {
				setNotice(response.data)			
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
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							reactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Notice</Text>
					{notice &&
						notice.length > 0 &&
						notice.map((x, index) => (
							<View
								className="bg-white mt-5 p-4 rounded-lg flex flex-row justify-between"
								key={index}
							>
								<View>
									<Text className="font-bold">{x.title}</Text>
									<Text>{x.description}</Text>
								</View>
								<View>
									<Text className="font-bold">{moment(x.startDate).fromNow()}</Text>
								</View>
							</View>
						))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default NoticeListPage
