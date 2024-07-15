import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from "../assets/images"
import CustomButton from "@components/buttons/CustomButton"
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from "../zustand/auth/useAuth";

const App = () => {
  const checkJwtAuth = useAuth((state) => state.checkJwtAuth);
  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const response = await checkJwtAuth(value)
      if(response.success){
        router.push("/home")
      }
      else{
        router.push("/sign-in")
      }
    } catch (error) {
      console.log(error)
      router.push("/sign-in")
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <SafeAreaView className='bg-[#F5F5F5] h-full'>
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className='w-full min-h-[85vh]'>
          <View className='w-full h-[50%] flex items-center'> 
            <Image source={Images.background}/>
            <Image source={Images.apartmentBuilding} className='absolute top-14'/>
          </View>
          <View className='w-full h-fit mt-10 mb-5 mx-5'>
            <Text className='text-2xl font-pregular italic'>
              Welcome to
            </Text>
            <Text className='text-5xl font-bold'>
              Gate Mate
            </Text>
          </View>
          <View className='items-center mx-5'>
            <CustomButton 
              title='Get Started' 
              handlePress={() => { router.push("/sign-up") }} 
              containerStyles='bg-primary p-3 w-full m-4'
              />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App;