import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { animations } from '@assets/index'

interface CustomLoaderProps {
	containerStyle?: string
  loaderWidth?: number
  loaderHeight?: number
}

const CustomLoader = ({ containerStyle, loaderHeight, loaderWidth }: CustomLoaderProps) => {
	// reference to the animation without re-rendering
	const animation = useRef<LottieView>(null)
	useEffect(() => {}, [])

	return (
		<View className={`bg-gray-50 opacity-50 absolute w-full h-full justify-center items-center z-1 ${containerStyle}`}>
			<LottieView
				autoPlay
				loop
				ref={animation}
				style={{
					width: loaderWidth || 250,
					height: loaderHeight || 250,
					backgroundColor: 'transparent',
				}}
				source={animations.loadingEffect}
			/>
		</View>
	)
}

export default CustomLoader
