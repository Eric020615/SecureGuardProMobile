declare module '*.png'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.jpg'
declare module '@bhavberi/react-native-user-avatar/src' {
	import { ImageProps } from 'react-native'

	interface AvatarProps extends ImageProps {
		name?: string
		size?: number
		bgColor?: string
		src?: string
		borderRadius?: number
		round?: boolean
		imageStyle?: object
	}

	export default function Avatar(props: AvatarProps): JSX.Element
}
