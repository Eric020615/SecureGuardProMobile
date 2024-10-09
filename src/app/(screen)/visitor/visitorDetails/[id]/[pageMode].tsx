import React from 'react'
import CustomFloatingButton from '@components/buttons/CustomFloatingButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import VisitorDetailsViewPage from '@pages/visitor/details/ViewPage'
import VisitorDetailsEditPage from '@pages/visitor/details/EditPage'

const VisitorDetails = () => {
	const { pageMode } = useLocalSearchParams()
	const currentPath = usePathname()
	const handlePress = () => {
		router.push(currentPath.replace('view', 'edit'))
	}
	const renderPage = () => {
		switch (pageMode) {
			case 'view':
				return (
					<>
						<VisitorDetailsViewPage />
						<CustomFloatingButton
							handlePress={handlePress}
							containerStyles="bg-primary w-[60px] h-[60px]
							absolute bottom-[40px] right-[40px] rounded-full 
							justify-center items-center"
							reactNativeIcons={<FontAwesome name="edit" color={'#FFFFFF'} size={24} />}
						/>
					</>
				)
			case 'edit':
				return <VisitorDetailsEditPage />
			default:
				return
		}
	}

	return (
		<>
			{renderPage()}
		</>
	)
}

export default VisitorDetails
