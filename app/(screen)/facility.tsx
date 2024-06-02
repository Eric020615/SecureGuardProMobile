import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Iconicons from "react-native-vector-icons/Ionicons"
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'

const Facility = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6">
          <View className='flex flex-row items-center justify-between'>
            <CustomButton 
              containerStyles='items-center h-fit'
              handlePress={() => {router.push("/home")}}
              reactNativeIcons={
                <Iconicons name="arrow-back" color={"#000000"} size={24}/>
              }/>
            <CustomButton 
              containerStyles='items-center h-fit'
              handlePress={() => {router.push("/home")}}
              title='View history'
              textStyles='text-sm text-gray-500'/>
          </View>
          <Text className="text-4xl text-black font-bold mt-6">Facilities</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Facility