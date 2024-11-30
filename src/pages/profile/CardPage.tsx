import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import { useCard } from '@store/card/useCard'
import Images from '@assets/images'

const CardPage = () => {
	const { card, createCardAction, getCardAction } = useCard()
	const [hasBadge, setHasBadge] = useState(false)

	useEffect(() => {
		getCardAction() // Fetch the user card details
	}, [])

	useEffect(() => {
		if (card.badgeNumber) {
			setHasBadge(true) // Set the badge presence state
		}
	}, [card])

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<View className="flex-1 px-4 my-6">
				<View className="flex flex-row items-center justify-between">
					<CustomButton
						containerStyles="items-center h-fit"
						handlePress={() => {
							router.push('/profile/view') // Navigate back to the profile page
						}}
						rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
					/>
				</View>
				<Text className="text-3xl text-black font-bold mt-6">Access Card</Text>

				{/* Content Conditional on Badge Presence */}
				{hasBadge ? (
					// Show the card if badge exists
					<View className="flex-1 justify-center items-center mt-6 mb-6">
						<View className="w-full h-fit bg-primary rounded-lg shadow-lg p-6 max-w-lg">
							<Text className="text-white text-lg font-semibold">My Access Card</Text>
							<View className="flex flex-row justify-between items-center mt-6">
								<Image source={Images.logo} style={{ width: 40, height: 40 }} className="rounded" />
								<Text className="text-white text-sm font-bold">SECURE GUARD PRO</Text>
							</View>

							<Text className="text-white text-xl font-mono tracking-wider mt-6">
								{card.badgeNumber.toString().padStart(16, '0')}
							</Text>

							<View className="flex flex-row justify-between mt-4">
								<View>
									<Text className="text-white text-xs">Cardholder</Text>
									<Text className="text-white text-base font-semibold">{card.cardHolder}</Text>
								</View>
								<View>
									<Text className="text-white text-xs">Expires</Text>
									<Text className="text-white text-base font-semibold">12/25</Text>
								</View>
							</View>
						</View>
					</View>
				) : (
					// Prompt to activate if no badge is found
					<View className="flex-1 justify-center items-center">
						<Text className="text-lg font-semibold text-black text-center mb-4">No badge found for your card.</Text>
						<Text className="text-sm text-gray-500 text-center mb-6">
							Please activate your badge to access your card details.
						</Text>
						<CustomButton
							title="Activate Badge"
							containerStyles="bg-primary py-3 px-6 rounded-lg"
							handlePress={() => {
								createCardAction() // Create a new card
							}}
						/>
					</View>
				)}
				{/* Need Help Section */}
				<View className="mt-8">
					<Text className="text-lg font-semibold text-black">Need Help?</Text>
					<Text className="text-sm text-gray-500 mt-2">
						If you have issues with your card, you can contact support or visit the help section.
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default CardPage
