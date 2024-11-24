import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useGlobalSearchParams, usePathname } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { useAuth } from '@store/auth/useAuth'

export const roles = {
	RES: 'RES', // Resident
	SUB: 'SUB', // Sub User
} as const // Makes roles a readonly type with literal values

type Role = keyof typeof roles // 'SA' | 'STF' | 'RES' | 'SUB'

export const rolePermissions: Record<Role, string[]> = {
	RES: [],
	SUB: [],
}

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
			const allowedRoutes = rolePermissions[response.data.role] || []
			// Check if the requested path is in the allowed routes
			if (!allowedRoutes.includes(pathname)) {
				throw new Error('Unauthorized')
			}
			if (redirectToHome) {
				router.push('/home')
				return
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
