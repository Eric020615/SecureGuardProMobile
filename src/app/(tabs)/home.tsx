import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { images, icons } from "../../assets/index"

const Home = () => {
  return (
    <SafeAreaView className="bg-slate-100 h-full w-full">
      <ScrollView>
        <View className="min-w-full">
          <Image source={images.homeBackground}/>
          <View className='absolute flex flex-row justify-between w-full top-10 px-6'>
            <Text className='text-white font-bold text-2xl'>Welcome Eric</Text>
            <Image source={images.sampleAvatar} />
          </View>
          <View className='p-8'>
            <Text className='text-black text-lg font-psemibold mb-4'>About Your Property</Text>
            <View className='flex flex-row gap-5'>
              <TouchableOpacity 
                className='p-6 w-fit flex justify-center items-center bg-white rounded-md flex-1'
                onPress={() => router.push("/package")}>
                <Image source={icons.packages} className='mb-2'/>
                <Text className='text-sm'>Package</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className='p-6 w-fit flex justify-center items-center bg-white rounded-md flex-1'
                onPress={() => router.push("/facility")}>
                <Image source={icons.facility} className='mb-2'/>
                <Text className='text-sm'>Facility</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className='p-6 w-fit flex justify-center items-center bg-white rounded-md flex-1'
                onPress={() => router.push('/notices')}>
                <Image source={icons.notices} className='mb-2'/>
                <Text className='text-sm'>Notices</Text>
              </TouchableOpacity>
            </View>
            <View className='mt-6'>
              <Text className='text-black text-lg font-psemibold mb-4'>Notices</Text>
              <View className='flex flex-row gap-5'>
                <TouchableOpacity className='p-6 w-fit flex justify-center items-center bg-white rounded-md flex-1'>
                  <Image source={icons.packages} className='mb-2'/>
                  <Text className='text-sm'>Package</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home