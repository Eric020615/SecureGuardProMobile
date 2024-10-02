import { View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { animations } from '@assets/index'

interface CustomLoaderProps {
	containerStyle?: string
	loaderWidth?: number
	loaderHeight?: number
}

const CustomDataNotFound = ({ containerStyle, loaderHeight, loaderWidth }: CustomLoaderProps) => {
	// reference to the animation without re-rendering
	const animation = useRef<LottieView>(null)
	useEffect(() => {}, [])

	return (
		<View
			className={`${containerStyle}`}
		>
			<LottieView
				autoPlay
				loop
				ref={animation}
				style={{
					width: loaderWidth || 150,
					height: loaderHeight || 150,
					backgroundColor: 'transparent',
				}}
				source={animations.dataNotFoundEffect}
			/>
		</View>
	)
}

export default CustomDataNotFound
