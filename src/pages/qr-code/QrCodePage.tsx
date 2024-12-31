import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCard } from '@store/card/useCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '@components/buttons/CustomButton'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'

const QrCodePage = () => {
	const { qrCode, getQrCodeAction, createQrCodeAction } = useCard()
	const [hasBadge, setHasBadge] = useState(false)
	const [hasQrCode, setHasQrCode] = useState(false)

	useEffect(() => {
		const checkBadge = async () => {
			const badge = await AsyncStorage.getItem('card')
			setHasBadge(!!badge) // Update state based on whether the badge exists
		}
		checkBadge()
	}, [])

	useEffect(() => {
		const fetchQrCode = async () => {
			if (!hasBadge) return // Do nothing if no badge

			if (!qrCode) {
				await getQrCodeAction() // Trigger fetching of QR code
			}
		}
		fetchQrCode()
	}, [hasBadge]) // Add hasBadge as a dependency

	useEffect(() => {
		if (qrCode) {
			setHasQrCode(true) // Set the badge presence state
		}
	}, [qrCode])

	const createQrCode = async () => {
		await createQrCodeAction()
		await getQrCodeAction() // Re-fetch the QR code after creation
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<View className="flex-1 justify-center items-center px-4 my-6">
				<Text className="text-4xl text-black font-bold text-center">QR Code</Text>
				<View className="justify-center items-center mt-6">
					{hasQrCode ? (
						<>
							{qrCode ? (
								<>
									<Image
										source={{ uri: `data:image/png;base64,${qrCode}` }}
										style={{ width: 200, height: 200 }}
										resizeMode="contain"
									/>
									<Text className="text-base text-gray-600 mt-6">Scan the QR code above for more details.</Text>
								</>
							) : (
								<Text className="text-lg text-gray-500">Loading QR Code...</Text>
							)}
						</>
					) : (
						<>
							<View className="justify-center items-center">
								<Text className="text-lg font-semibold text-black text-center mb-4">
									No QR Code found for your account.
								</Text>
								<Text className="text-sm text-gray-500 text-center mb-6">
									Please activate your badge to access with qr code.
								</Text>
								<CustomButton
									title="Activate QR Code"
									containerStyles="bg-primary p-3 rounded-lg"
									handlePress={() => {
										createQrCode()
									}}
								/>
							</View>
						</>
					)}
				</View>
			</View>
		</SafeAreaView>
	)
}

export default QrCodePage
