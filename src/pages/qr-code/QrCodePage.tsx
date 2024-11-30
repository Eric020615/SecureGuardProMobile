import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCard } from '@store/card/useCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

const QrCodePage = () => {
	const { qrCode, getQrCodeAction } = useCard()
	const [hasBadge, setHasBadge] = useState(false)

	useEffect(() => {
		const checkBadge = async () => {
			const badge = await AsyncStorage.getItem('card')
			setHasBadge(!!badge) // Update state based on whether the badge exists
		}
		checkBadge()
	}, [])

	useEffect(() => {
		if (!hasBadge) return // Do nothing if no badge
		if (!qrCode) {
			getQrCodeAction() // Trigger fetching of QR code
		}
	}, [hasBadge]) // Add hasBadge as a dependency

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<View className="flex-1 justify-center items-center px-4 my-6">
				<Text className="text-4xl text-black font-bold text-center">QR Code</Text>
				<View className="justify-center items-center mt-6">
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
				</View>
			</View>
		</SafeAreaView>
	)
}

export default QrCodePage
