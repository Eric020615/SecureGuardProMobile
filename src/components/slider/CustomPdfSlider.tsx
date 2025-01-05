import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Pdf from 'react-native-pdf'

interface CustomPdfSliderProps {
	item: {
		key: number
		name: string
		pdfUrl: string // URL to the PDF file
	}[]
}

const CustomPdfSlider = ({ item }: CustomPdfSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0) // Track the current index

	const handleNext = () => {
		const nextIndex = (currentIndex + 1) % item.length // Loop back to the first item
		setCurrentIndex(nextIndex)
	}

	const handlePrev = () => {
		const prevIndex = (currentIndex - 1 + item.length) % item.length // Loop back to the last item
		setCurrentIndex(prevIndex)
	}

	// Check if next and prev buttons should be disabled
	const isPrevDisabled = currentIndex === 0
	const isNextDisabled = currentIndex === item.length - 1

	return (
		<View className="flex flex-1">
			{/* PDF Viewer Section */}
			<View className="flex-1 w-full">
				<Pdf
					trustAllCerts={false}
					source={{ uri: item[currentIndex].pdfUrl, cache: true }}
					onError={(error) => {
						console.error(error)
					}}
					style={{ flex: 1, width: '100%' }}
				/>
			</View>

			{/* Navigation Controls Section */}
			<View className="mt-4 px-4">
				<View className="flex-row items-center justify-between">
					{/* Previous Button */}
					<TouchableOpacity
						className={`px-4 py-2 rounded-full ${isPrevDisabled ? 'bg-gray-200' : 'bg-primary'}`}
						onPress={handlePrev}
						disabled={isPrevDisabled}
					>
						<Text className={`text-lg font-bold ${isPrevDisabled ? 'text-gray-400' : 'text-white'}`}>{'<'}</Text>
					</TouchableOpacity>

					{/* Filename */}
					<Text className="text-lg font-bold text-center mx-4 flex-shrink" numberOfLines={1} ellipsizeMode="tail">
						{item[currentIndex].name}
					</Text>

					{/* Next Button */}
					<TouchableOpacity
						className={`px-4 py-2 rounded-full ${isNextDisabled ? 'bg-gray-200' : 'bg-primary'}`}
						onPress={handleNext}
						disabled={isNextDisabled}
					>
						<Text className={`text-lg font-bold ${isNextDisabled ? 'text-gray-400' : 'text-white'}`}>{'>'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default CustomPdfSlider
