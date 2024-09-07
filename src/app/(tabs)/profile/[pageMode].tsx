import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProfileDetailsViewPage from '@pages/profile/details/ViewPage'
import ProfileDetailsEditPage from '@pages/profile/details/EditPage'

const Profile = () => {
	const { pageMode } = useLocalSearchParams()
	const renderPage = () => {
		switch (pageMode) {
			case 'view':
				return (
					<>
						<ProfileDetailsViewPage />
					</>
				)
			case 'edit':
				return <ProfileDetailsEditPage />
			default:
				return (
					<>
						<ProfileDetailsViewPage />
					</>
				)
		}
	}
	return <>{renderPage()}</>
}

export default Profile
