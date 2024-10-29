import { View, Image, Dimensions, ImageSourcePropType } from 'react-native'
import React, { Dispatch, SetStateAction, useState, useCallback } from 'react'
import Carousel from 'react-native-reanimated-carousel'

interface CustomImageSliderProps {
	item: {
		key: number
		name: string
		image: ImageSourcePropType
	}[]
	onChangeIndex: Dispatch<SetStateAction<string>>
	containerStyle?: string
}

const CustomImageSlider = ({ item, onChangeIndex, containerStyle }: CustomImageSliderProps) => {
	const { width } = Dimensions.get('window') // Get full screen width
	const imageHeight = (width * 9) / 16 // 16:9 ratio
	const [currentIndex, setCurrentIndex] = useState(0) // Track the current index

	const handleSnapToItem = useCallback(
		(index: number) => {
			setCurrentIndex(index) // Update the current index for pagination
			onChangeIndex(item[index].name) // Notify parent of index change
		},
		[item, onChangeIndex],
	)

	return (
		<View style={{ flex: 1, ...(containerStyle ? { containerStyle } : {}) }}>
			<Carousel
				width={width}
				height={imageHeight}
				data={item}
				onSnapToItem={handleSnapToItem}
				renderItem={({ item }) => (
					<View
						style={{
							width: width,
							height: imageHeight,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							source={item.image}
							style={{
								width: '100%',
								height: imageHeight,
							}}
							resizeMode="cover"
						/>
					</View>
				)}
			/>

			{/* Pagination Dots */}
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
				{item.map((_, index) => (
					<View
						key={index}
						style={{
							width: 8,
							height: 8,
							borderRadius: 4,
							backgroundColor: 'black',
							marginHorizontal: 4,
							opacity: index === currentIndex ? 1 : 0.5, // Highlight the current dot
						}}
					/>
				))}
			</View>
		</View>
	)
}

export default CustomImageSlider
