import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import CustomButton from '@components/buttons/CustomButton'

interface CustomModalProps {
	isVisible: boolean
	onCloseModal: () => void
	title?: string
	subtitle?: string
}

const CustomModal = ({ isVisible, onCloseModal, title, subtitle }: CustomModalProps) => {
	return (
		<Modal isVisible={isVisible} onBackdropPress={onCloseModal}>
			<View className="bg-white p-5 rounded-lg items-center">
				{title && <Text className="text-lg font-bold mb-4">{title}</Text>}
				<CustomButton
					title="Close"
					handlePress={onCloseModal}
					containerStyles="bg-primary p-2 w-[50%] self-center"
					textStyles="text-sm text-white"
				/>
			</View>
		</Modal>
	)
}

export default CustomModal
