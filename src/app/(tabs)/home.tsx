import CustomFloatingButton from '@components/CustomFloatingButton'
import HomePage from '@pages/home/HomePage'
import Iconicons from 'react-native-vector-icons/Ionicons'

const Home = () => {
	return (
		<>
			<HomePage />
			<CustomFloatingButton
				handlePress={() => {}}
				containerStyles="bg-primary w-[60px] h-[60px]
                absolute bottom-[40px] right-[40px] rounded-full 
                justify-center items-center"
				reactNativeIcons={<Iconicons name="add" color={'#FFFFFF'} size={24} />}
			/>
		</>
	)
}

export default Home
