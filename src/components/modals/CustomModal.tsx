import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import CustomButton from '@components/buttons/CustomButton'
import { useModal } from '@zustand/modal/useModal'

interface CustomModalProps {
	customConfirmButtonPress?: () => void
}

const CustomModal = ({customConfirmButtonPress}: CustomModalProps) => {
	const {isOpen, toogleModal, content} = useModal()
	customConfirmButtonPress = customConfirmButtonPress || (() => {})
	return (
		<Modal isVisible={isOpen} onBackdropPress={toogleModal} className='bg-transparent'>
			<View className="bg-white p-5 rounded-lg items-center">
				{content?.title && <Text className="text-xl font-bold mb-4 text-center">{content.title}</Text>}
				{content?.subtitle && <Text className="text-sm mb-4 text-center">{content.subtitle}</Text>}
				<CustomButton
					title="Close"
					handlePress={() => {
						toogleModal();
						customConfirmButtonPress()
					}}
					containerStyles="bg-primary p-2 w-[30%] self-center"
					textStyles="text-sm text-white"
				/>
			</View>
		</Modal>
	)
}

export default CustomModal
