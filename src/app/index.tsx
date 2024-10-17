import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image, Alert, BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '@assets/images'
import CustomButton from '@components/buttons/CustomButton'
import { router, useNavigation } from 'expo-router'

const App = () => {
	const navigation = useNavigation()

	useEffect(() => {
		const backAction = () => {
			// Check if the user is on any screen inside the "Tabs" navigator
			const currentRoute = navigation.getState().routes[navigation.getState().index]
			const isTabScreen = currentRoute.name === '(tabs)' // Assume "Tabs" is your tab navigator's name
			if (isTabScreen) {
				Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
					{
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					},
					{ text: 'YES', onPress: () => BackHandler.exitApp() },
				])
				return true // Prevent the default back action (exiting the app)
			} else {
				navigation.goBack() // Default go back behavior for non-tab screens
				return true
			}
		}

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

		return () => backHandler.remove() // Cleanup the listener when the component unmounts
	}, [navigation]) // Depend on navigation state

	return (
		<SafeAreaView className="bg-[#F5F5F5] h-full">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="w-full min-h-[85vh]">
					<View className="w-full h-[50%] flex items-center">
						<Image source={Images.background} />
						<Image source={Images.apartmentBuilding} className="absolute top-14" />
					</View>
					<View className="w-full h-fit mt-10 mb-5 mx-5">
						<Text className="text-2xl font-pregular italic">Welcome to</Text>
						<Text className="text-5xl font-bold">Gate Mate</Text>
					</View>
					<View className="items-center mx-5">
						<CustomButton
							title="Get Started"
							handlePress={() => {
								router.push('/sign-up')
							}}
							containerStyles="bg-primary p-3 w-full m-4"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default App
