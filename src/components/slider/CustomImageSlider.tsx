import { View, Image, Dimensions, StyleSheet, ImageSourcePropType } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'

interface CustomImageSliderProps {
	item: {
        key: number;
        name: string;
        image: ImageSourcePropType;
    }[]
	onChangeIndex: Dispatch<SetStateAction<string>>
    containerStyle?: string
}

const CustomImageSlider = ({ item, onChangeIndex, containerStyle }: CustomImageSliderProps) => {
	const { width } = Dimensions.get('window') // Get full screen width
	const imageHeight = (width * 9) / 16 // 16:9 ratio
	const [currentIndex, setCurrentIndex] = useState(0) // Track the current index

	const handleSnapToItem = (index: number) => {
		setCurrentIndex(index) // Update the current index for pagination
		onChangeIndex(item[index].name) // Notify parent of index change
	}

	return (
		<View className={`${containerStyle} flex-1`}>
			<Carousel
				width={width} // Use full screen width
				height={imageHeight} // Maintain desired aspect ratio
				data={item}
				onSnapToItem={handleSnapToItem}
				renderItem={({ item, index }) => (
					<View
						style={{
							width: width, // Ensure container fills the screen width
							height: imageHeight,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						key={index}
					>
						<Image
							source={item.image}
							style={{
								width: '100%', // Make the image fill the container width
								height: imageHeight, // Maintain aspect ratio height
							}}
							resizeMode="cover" // You can use "cover" to ensure it fills the width and height
						/>
					</View>
				)}
			/>

			{/* Pagination Dots */}
			<View style={styles.paginationContainer}>
				{item.map((_, index) => (
					<View
						key={index}
						style={[
							styles.paginationDot,
							{ opacity: index === currentIndex ? 1 : 0.5 }, // Highlight the current dot
						]}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	paginationContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#000',
		marginHorizontal: 4,
	},
})

export default CustomImageSlider
