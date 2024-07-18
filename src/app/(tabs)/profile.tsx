import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const Profile = () => {
  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      router.push("/sign-in")
    } catch (error) {
      console.log(error)
    }
  }


	return (
		<SafeAreaView className="bg-white h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <CustomButton
            title="Log Out"
            handlePress={() => {logOut()}}
            containerStyles="bg-primary p-3 w-full mt-7"
          />
        </View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Profile
