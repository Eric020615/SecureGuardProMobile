import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'
import { useVisitor } from '@zustand/visitor/useVisitor'
import { GetVisitorDto } from '@zustand/types'
import CustomButton from '@components/buttons/CustomButton'
import { VisitorEnum } from '@config/constant/visitor'
import { router } from 'expo-router'
import AntDesign from 'react-native-vector-icons/AntDesign'

const VisitorListPage = () => {
	const [isPast, setIsPast] = useState(true)
	const { getVisitorsAction } = useVisitor()
	const [visitor, setVisitor] = useState<GetVisitorDto[]>([])

	useEffect(() => {
		getVisitors(isPast)
	}, [])

	useEffect(() => {
		getVisitors(isPast)
	}, [isPast])

	const getVisitors = async (isPast: boolean) => {
		try {
			const response = await getVisitorsAction(isPast)
			if (response.success) {
				setVisitor(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
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
					{visitor &&
						visitor.length > 0 &&
						visitor.map((x, index) => (
							<TouchableOpacity
								className="bg-white mt-5 p-4 rounded-lg flex flex-row justify-between"
								key={index}
								onPress={() => {
									router.replace(`/visitorDetails/${x.visitorId}/view`)
								}}
							>
								<View className='grid gap-1'>
									<Text className="font-bold text-lg">{x.visitorName}</Text>
									<Text className="text-gray-500 font-semibold">
										{VisitorEnum[x.visitorCategory] ? VisitorEnum[x.visitorCategory] : 'others'}
									</Text>
									<View className="flex flex-row gap-1 items-center">
										<AntDesign name="clockcircle" color="#10312b" size={16} />
										<Text className="font-bold">
											{moment(x.visitDateTime).tz('Asia/Kuala_Lumpur').format('D/M/YYYY, HH:mm')}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorListPage
