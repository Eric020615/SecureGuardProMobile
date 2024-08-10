import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'
import { useVisitor } from '@zustand/visitor/useVisitor'
import { GetVisitorDto } from '@zustand/types'
import CustomButton from '@components/buttons/CustomButton'

const VisitorListPage = () => {
	const [isPast, setIsPast] = useState(true)
	const { getVisitorByIdAction } = useVisitor()
	const [visitor, setVisitor] = useState<GetVisitorDto[]>([])

	useEffect(() => {
		getVisitorById(isPast)
	}, [])

	useEffect(() => {
		getVisitorById(isPast)
	}, [isPast])

	const getVisitorById = async (isPast: boolean) => {
		try {
			const response = await getVisitorByIdAction(isPast)
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
							<View
								className="bg-white mt-5 p-4 rounded-lg flex flex-row justify-between"
								key={index}
							>
								<View>
									<Text className="font-bold">{x.visitorName}</Text>
									<Text>{x.visitorCategory}</Text>
								</View>
								<View>
									<Text className="font-bold">{moment(x.visitDateTime).fromNow()}</Text>
								</View>
							</View>
						))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorListPage
