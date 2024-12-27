import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import CustomButton from '@components/buttons/customButton/CustomButton'

interface CustomConfirmModalProps {
	isOpen: boolean
	setOpen: () => void
	content: {
		title: string
		subtitle: string
	}
	onConfirm?: () => void
	onCancel?: () => void
	onConfirmTestId?: string
	onCancelTestId?: string
}

const CustomConfirmModal = ({
	isOpen,
	setOpen,
	content,
	onConfirm = () => {},
	onCancel = () => {},
	onConfirmTestId,
	onCancelTestId,
}: CustomConfirmModalProps) => {
	return (
		<Modal isVisible={isOpen} onBackdropPress={setOpen} className="bg-transparent">
			<View className="bg-white p-5 rounded-lg items-center">
				{content?.title && (
					<Text className="text-xl font-bold mb-4 text-center">{content.title}</Text>
				)}
				{content?.subtitle && <Text className="text-sm mb-4 text-center">{content.subtitle}</Text>}
				<View className='flex flex-row justify-evenly w-full mt-2'>
					<CustomButton
						title="Close"
						handlePress={() => {
							setOpen()
							onCancel()
						}}
						containerStyles="bg-red-500 p-2 w-[30%] self-center"
						textStyles="text-sm text-white"
						testId= {onCancelTestId}
					/>
					<CustomButton
						title="Confirm"
						handlePress={() => {
							setOpen()
							onConfirm()
						}}
						containerStyles="bg-primary p-2 w-[30%] self-center"
						textStyles="text-sm text-white"
						testId= {onConfirmTestId}
					/>
				</View>
			</View>
		</Modal>
	)
}

export default CustomConfirmModal
