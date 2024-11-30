import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useGlobalSearchParams, usePathname } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { useAuth } from '@store/auth/useAuth'
import { RoleEnum } from '@config/constant/user'
import { ToastAndroid } from 'react-native'

export const GlobalContext = React.createContext<any>(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { checkJwtAuthAction } = useAuth()
	const pathname = usePathname()
	const params = useGlobalSearchParams()

	const checkToken = async (redirectToHome = false) => {
		try {
			if (
				pathname == '/sign-up' ||
				pathname == '/sign-in' ||
				pathname == '/user-information' ||
				pathname == '/forgot-password'
			) {
				return
			}
			const value = await AsyncStorage.getItem('token')
			if (!value) {
				throw new Error('Unauthorized')
			}
			const response = await checkJwtAuthAction(value)
			if (!response.success) {
				throw new Error('Unauthorized')
			}
			if (response.data.role !== RoleEnum.RESIDENT && response.data.role !== RoleEnum.RESIDENT_SUBUSER) {
				throw new Error('Invalid Role')
			}
			if (redirectToHome) {
				router.push('/home')
			}
		} catch (error) {
			router.push('/sign-in')
		}
	}

	const checkCardRegistration = async () => {
		try {
			// Define routes that require card registration
			const protectedRoutes = ['/face-auth', '/qrCode'] // Add your protected paths here

			if (protectedRoutes.includes(pathname)) {
				const cardInfo = await AsyncStorage.getItem('card')
				if (!cardInfo) {
					// Redirect to card registration page if no card is registered
					router.push('/card')
					throw new Error('Please register your card to access this feature.')
				}
			}
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.CENTER)
		}
	}

	// Track the location in your analytics provider here.
	useEffect(() => {
		checkToken(true)
	}, [])

	// Track the location in your analytics provider here.
	useEffect(() => {
		checkToken()
		checkCardRegistration()
	}, [pathname, params])

	return <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
