import CustomFloatingButton from '@components/buttons/customFloatingButton/CustomFloatingButton'
import HomePage from '@pages/home/HomePage'
import { useRouter } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Home = () => {
	const router = useRouter();
	const handlePress = () => {
		router.push("/visitor/create")
	}

	return (
		<>
			<HomePage />
			<CustomFloatingButton
				handlePress={handlePress}
				containerStyles="bg-primary w-[60px] h-[60px]
                absolute bottom-[40px] right-[40px] rounded-full 
                justify-center items-center"
				reactNativeIcons={<Ionicons name="add" color={'#FFFFFF'} size={24} />}
			/>
		</>
	)
}

export default Home
