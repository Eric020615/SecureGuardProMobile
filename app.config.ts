import type { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	slug: 'SecureGuardPro',
	name: 'SecureGuardPro',
	android: {
		package: 'com.secure.guard.pro',
		adaptiveIcon: {
			foregroundImage: './src/assets/adaptive-icon.png',
			backgroundColor: '#ffffff',
		},
	},
})
