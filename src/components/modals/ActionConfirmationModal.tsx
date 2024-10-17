import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import CustomButton from '@components/buttons/CustomButton'
import { useModal } from '@store/modal/useModal'

interface ActionConfirmationModalProps {
	onSuccessConfirm?: () => void
	onFailedConfirm?: () => void
}

const ActionConfirmationModal = ({
	onSuccessConfirm = () => {},
	onFailedConfirm = () => {},
}: ActionConfirmationModalProps) => {
	const { isOpen, toogleModalAction, content } = useModal()
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
						if (content?.isError) {
							onFailedConfirm()
						} else {
							onSuccessConfirm()
						}
					}}
					containerStyles="bg-primary p-2 w-[30%] self-center"
					textStyles="text-sm text-white"
				/>
			</View>
		</Modal>
	)
}

export default ActionConfirmationModal
