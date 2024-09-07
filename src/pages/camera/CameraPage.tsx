import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
	CameraView,
	CameraType,
	useCameraPermissions,
	FlashMode,
	CameraCapturedPicture,
} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import CustomButton from '@components/buttons/CustomButton'
import Entypo from 'react-native-vector-icons/Entypo'

const CameraPage = () => {
	const [cameraPermission, requestCameraPermission] = useCameraPermissions()
	const [image, setImage] = useState<CameraCapturedPicture>(null)
	const [facing, setFacing] = useState<CameraType>('back')
	const [flash, setFlash] = useState<FlashMode>('off')
	const cameraRef = useRef<CameraView>(null)

	useEffect(() => {
		;(async () => {
			MediaLibrary.requestPermissionsAsync()
			await requestCameraPermission()
		})()
	}, [])

	const takePicture = async () => {
		if (cameraRef) {
			try {
				const data = await cameraRef.current.takePictureAsync()
				console.log(data)
				setImage(data)
			} catch (error) {
				console.log(error)
			}
		}
	}

	if (!cameraPermission) {
		return <Text>No access to camera</Text>
	}

	if (!cameraPermission.granted) {
		return (
			<View className="flex-1 justify-center">
				<Text className="text-center pb-10">We need your permission to show the camera</Text>
				<CustomButton
					title="Grant Permission"
					handlePress={requestCameraPermission}
					containerStyles="border-primary border bg-white p-3 w-full mt-2 flex flex-row self-center"
					textStyles="text-sm text-primary"
				/>
			</View>
		)
	}

	const toggleCameraFacing = () => {
		setFacing((current) => (current === 'back' ? 'front' : 'back'))
	}

    const toggleFlash = () => {
		setFlash((current) => (current === 'off' ? 'on' : 'off'))
	}

	const saveImage = async () => {
		if (image) {
			try {
				const asset = await MediaLibrary.createAssetAsync(image.uri)
				console.log(asset)
				setImage(null)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<SafeAreaView className="h-full">
			{!image ? (
				<CameraView className="flex-1 rounded-3xl" facing={facing} ref={cameraRef}>
					<View className="flex-1 bg-transparent">
						<View className='flex-row justify-between px-8 py-4'>
							<CustomButton
								handlePress={toggleCameraFacing}
								containerStyles="flex flex-row items-center justify-center h-10"
								textStyles="text-base text-[f1f1f1]] font-bold ml-4"
								leftReactNativeIcons={<Entypo name="retweet" color={'#f1f1f1'} size={28} />}
							/>
							<CustomButton
								handlePress={toggleFlash}
								containerStyles="flex flex-row items-center justify-center h-10"
								textStyles="text-base text-[f1f1f1]] font-bold ml-4"
								leftReactNativeIcons={<Entypo name="flash" color={flash === 'off' ? 'gray' : '#f1f1f1'} size={28} />}
							/>
						</View>
					</View>
				</CameraView>
			) : (
				<View className="flex-1">
					<Image source={{uri: image.uri}} className="flex-1" />
				</View>
			)}
			<View className="bg-black px-5 py-2">
				{image ? (
					<View className='flex flex-row justify-between'>
						<CustomButton
							title="Re-take"
							handlePress={() => {
								setImage(null)
							}}
							containerStyles="flex flex-row items-center justify-center h-10"
							textStyles="text-base text-[f1f1f1]] font-bold ml-4"
							leftReactNativeIcons={<Entypo name="retweet" color={'#f1f1f1'} size={28} />}
						/>
						<CustomButton
							title="Save"
							handlePress={saveImage}
							containerStyles="flex flex-row items-center justify-center h-10"
							textStyles="text-base text-[f1f1f1]] font-bold ml-4"
							leftReactNativeIcons={<Entypo name="check" color={'#f1f1f1'} size={28} />}
						/>
					</View>
				) : (
					<>
						<CustomButton
							title="Take a picture"
							handlePress={takePicture}
							containerStyles="flex flex-row items-center justify-center h-10"
							textStyles="text-base text-[f1f1f1]] font-bold ml-4"
							leftReactNativeIcons={<Entypo name="camera" color={'#f1f1f1'} size={28} />}
						/>
					</>
				)}
			</View>
		</SafeAreaView>
	)
}

export default CameraPage
