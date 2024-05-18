import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Text className='text-3xl text-black'>
            Gate Mate
          </Text>
          <Text className='text-7xl w-full font-bold text-primary'>
            Log in
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn