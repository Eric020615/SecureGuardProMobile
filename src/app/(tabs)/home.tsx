import CustomFloatingButton from '@components/CustomFloatingButton'
import HomePage from '@pages/home/HomePage'
import { useRouter } from 'expo-router'
import Iconicons from 'react-native-vector-icons/Ionicons'

const Home = () => {
	const router = useRouter();
	const handlePress = () => {
		router.replace("/createVisitor")
	}

	return (
		<>
			<HomePage />
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

export default Home
