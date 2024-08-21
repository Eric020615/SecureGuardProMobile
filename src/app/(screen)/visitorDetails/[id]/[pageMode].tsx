import React, { useEffect } from 'react'
import CustomFloatingButton from '@components/buttons/CustomFloatingButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import VisitorDetailsViewPage from '@pages/visitor/details/view'
import VisitorDetailsEditPage from '@pages/visitor/details/edit'

const VisitorDetails = () => {
	const { pageMode } = useLocalSearchParams()
	useEffect(() => {
		console.log('1' + pageMode)
	}, [pageMode])
	const currentPath = usePathname()
	const handlePress = () => {
		router.push(currentPath.replace('view', 'edit'))
	}
	const renderPage = () => {
		switch (pageMode) {
			case 'view':
				return <VisitorDetailsViewPage />
			case 'edit':
				return <VisitorDetailsEditPage />
			default:
				return
		}
	}

	return (
		<>
			{renderPage()}
			<CustomFloatingButton
				handlePress={handlePress}
				containerStyles="bg-primary w-[60px] h-[60px]
                absolute bottom-[40px] right-[40px] rounded-full 
                justify-center items-center"
				reactNativeIcons={<Iconicons name="add" color={'#FFFFFF'} size={24} />}
			/>
		</>
	)
}

export default VisitorDetails
