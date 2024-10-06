import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import CustomButton from '@components/buttons/CustomButton'
import { useModal } from '../../store/modal/useModal'

interface CustomModalProps {
	customConfirmButtonPressSuccess?: () => void
	customConfirmButtonPressError?: () => void
}

const CustomModal = ({
	customConfirmButtonPressSuccess,
	customConfirmButtonPressError,
}: CustomModalProps) => {
	const { isOpen, toogleModalAction, content } = useModal()
	customConfirmButtonPressSuccess = customConfirmButtonPressSuccess || (() => {})
	customConfirmButtonPressError = customConfirmButtonPressError || (() => {})
	return (
		<Modal isVisible={isOpen} onBackdropPress={toogleModalAction} className="bg-transparent">
			<View className="bg-white p-5 rounded-lg items-center">
				{content?.title && (
					<Text className="text-xl font-bold mb-4 text-center">{content.title}</Text>
				)}
				{content?.subtitle && <Text className="text-sm mb-4 text-center">{content.subtitle}</Text>}
				<CustomButton
					title="Close"
					handlePress={() => {
						toogleModalAction()
						if (!content.isError) {
							customConfirmButtonPressSuccess()
						} else {
							customConfirmButtonPressError()
						}
					}}
					containerStyles="bg-primary p-2 w-[30%] self-center"
					textStyles="text-sm text-white"
				/>
			</View>
		</Modal>
	)
}

export default CustomModal
