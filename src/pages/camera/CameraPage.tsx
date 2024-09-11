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
import { useApplication } from '@zustand/index'
import { convertImageToBase64 } from '../../helpers/file'
import { useFaceAuth } from '@zustand/faceAuth/useFaceAuth'
import { CreateUserFaceAuthDto } from '@zustand/types'
import { router } from 'expo-router'
import { useModal } from '@zustand/modal/useModal'
import {} from 'expo'
import CustomModal from '@components/modals/CustomModal'

const CameraPage = () => {
	const [cameraPermission, requestCameraPermission] = useCameraPermissions()
	const [image, setImage] = useState<CameraCapturedPicture>(null)
	const [facing, setFacing] = useState<CameraType>('back')
	const [flash, setFlash] = useState(false)
	const { setIsLoading } = useApplication()
	const { uploadUserFaceAuthAction } = useFaceAuth()
	const { setCustomConfirmModal, isError } = useModal()
	const cameraRef = useRef<CameraView>(null)

	useEffect(() => {
		;(async () => {
			MediaLibrary.requestPermissionsAsync()
			await requestCameraPermission()
		})()
	}, [])

	if (!cameraPermission) {
		return (
			<SafeAreaView className="h-full bg-black">
				<Text className="text-center">No access to camera</Text>
			</SafeAreaView>
		)
	}

	if (!cameraPermission.granted) {
		return (
			<SafeAreaView className="h-full bg-black">
				<View className="flex-1 justify-center mx-8">
					<Text className="text-center pb-10 text-white">
						We need your permission to show the camera
					</Text>
					<CustomButton
						title="Grant Permission"
						handlePress={requestCameraPermission}
						containerStyles="border-primary border bg-white p-3 w-full mt-2 flex flex-row self-center"
						textStyles="text-sm text-primary"
					/>
				</View>
			</SafeAreaView>
		)
	}

	const toggleCameraFacing = () => {
		setFacing((current) => (current === 'back' ? 'front' : 'back'))
	}

	const toggleFlash = () => {
		setFlash(!flash)
	}

	const takePicture = async () => {
		if (cameraRef) {
			try {
				setIsLoading(true)
				const data = await cameraRef.current.takePictureAsync()
				setImage(data)
			} catch (error) {
				setCustomConfirmModal({
					title: 'Face Authentication Created Failed',
					subtitle: 'Please Retry It Again Or Contact Our Support Team',
				})
			} finally {
				setIsLoading(false)
			}
		}
	}

	const saveImage = async () => {
		try {
			setIsLoading(true)
			if (image) {
				let base64 = await convertImageToBase64(image)
				if (base64 == '') {
					throw new Error('Failed to convert image to base64')
				}
				const response = await uploadUserFaceAuthAction({
					faceData: base64,
				})
				if (response.success) {
					setCustomConfirmModal({
						title: 'Face Recognition Setup Complete',
						subtitle: 'You can now access the premises using your face.',
					})
				} else {
					throw new Error('No image to save')
				}
				setImage(null)
			} else {
				throw new Error('No image to save')
			}
		} catch (error) {
			setCustomConfirmModal({
				title: 'Face Authentication Created Failed',
				subtitle: 'Please Retry It Again Or Contact Our Support Team',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<SafeAreaView className="h-full">
			<CustomModal
				customConfirmButtonPress={() => {
					if (isError) {
						router.replace('/camera')
					} else {
						router.replace('/profile/view')
					}
				}}
			/>
			{!image ? (
				<CameraView
					className="flex-1 rounded-3xl"
					facing={facing}
					ref={cameraRef}
					enableTorch={flash}
				>
					<View className="flex-1 bg-transparent">
						<View className="flex-row justify-between px-8 py-4">
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
								leftReactNativeIcons={
									<Entypo name="flash" color={flash ? 'gray' : '#f1f1f1'} size={28} />
								}
							/>
						</View>
					</View>
				</CameraView>
			) : (
				<View className="flex-1">
					<Image source={{ uri: image.uri }} className="flex-1" />
				</View>
			)}
			<View className="bg-black px-5 py-2">
				{image ? (
					<View className="flex flex-row justify-between">
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
