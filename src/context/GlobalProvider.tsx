import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@zustand/auth/useAuth'
import { router, useGlobalSearchParams, usePathname } from 'expo-router'
import React, { useContext, useEffect } from 'react'

export const GlobalContext = React.createContext<any>(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { checkJwtAuthAction } = useAuth()
	const pathname = usePathname()
	const params = useGlobalSearchParams()

	const checkToken = async (redirectToHome = false) => {
		try {
			if (pathname == '/sign-up' || pathname == '/sign-in' || pathname == '/user-information') {
				return
			}
			const value = await AsyncStorage.getItem('token')
			if (!value) {
				router.push('/sign-in')
			}
			const response = await checkJwtAuthAction(value)
			if (response.success && redirectToHome) {
				router.push('/home')
				return
			}
			if (!response.success) {
				router.push('/sign-in')
			}
		} catch (error) {
			router.push('/sign-in')
		}
	}

	// Track the location in your analytics provider here.
	useEffect(() => {
		checkToken(true)
	}, [])

	// Track the location in your analytics provider here.
	useEffect(() => {
		checkToken()
	}, [pathname, params])

	return <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
