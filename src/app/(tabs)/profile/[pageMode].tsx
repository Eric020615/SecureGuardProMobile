import React from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import ProfileDetailsViewPage from '@pages/profile/details/ViewPage'
import CustomFloatingButton from '@components/buttons/CustomFloatingButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ProfileDetailsEditPage from '@pages/profile/details/EditPage'

const Profile = () => {
	const { pageMode } = useLocalSearchParams()
	const currentPath = usePathname()
	const handlePress = () => {
        if(currentPath.includes('view')){
            router.push(currentPath.replace('view', 'edit'))
            return
        }
		router.push(currentPath.concat('/edit'))
	}
	const renderPage = () => {
		switch (pageMode) {
			case 'view':
				return (
					<>
						<ProfileDetailsViewPage />
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
				return <ProfileDetailsEditPage />
			default:
				return (
					<>
						<ProfileDetailsViewPage />
						<CustomFloatingButton
							handlePress={handlePress}
							containerStyles="bg-primary w-[60px] h-[60px]
							absolute bottom-[40px] right-[40px] rounded-full 
							justify-center items-center"
							reactNativeIcons={<FontAwesome name="edit" color={'#FFFFFF'} size={24} />}
						/>
					</>
				)
		}
	}
	return <>{renderPage()}</>
}

export default Profile
