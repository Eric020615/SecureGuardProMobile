import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const VisitorListPage = () => {
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<Text>Visitor List Page</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorListPage
