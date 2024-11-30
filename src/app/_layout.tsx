import { Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { NativeWindStyleSheet } from 'nativewind'
import { useEffect } from 'react'
import GlobalProvider from '../context/GlobalProvider'
import CustomLoader from '@components/loader/CustomLoader'
import { useApplication } from '@store/application/useApplication'
import { NotificationProvider } from '../context/NotificationContext'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
	const { isLoading } = useApplication()
	NativeWindStyleSheet.setOutput({
		default: 'native',
	})
	const [fontsLoaded, error] = useFonts({
		'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
		'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
		'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
		'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
	})
	useEffect(() => {
		if (error) throw error
		if (fontsLoaded) SplashScreen.hideAsync()
	}, [fontsLoaded, error])

	if (!fontsLoaded && !error) return null

	return (
		<NotificationProvider>
			<GlobalProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="(screen)" options={{ headerShown: false }} />
				</Stack>
				{isLoading && <CustomLoader />}
			</GlobalProvider>
		</NotificationProvider>
	)
}

export default RootLayout
