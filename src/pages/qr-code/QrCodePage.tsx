import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQrCode } from '@store/card/useCard'

const QrCodePage = () => {
	const { qrCode, getQrCodeAction } = useQrCode()

	useEffect(() => {
		if (!qrCode) {
			getQrCodeAction() // Fetch the Base64 QR code data if not available
		}
	}, [qrCode, getQrCodeAction])

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
