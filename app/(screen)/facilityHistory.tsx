import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const facilityHistory = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-3xl text-black">Booking History</Text>          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default facilityHistory