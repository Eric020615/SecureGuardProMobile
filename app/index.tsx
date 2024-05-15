import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import { View, Text } from 'react-native'

const App = () => {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
        <Text className='text-3xl font-pblack'>
          Yo!
        </Text>
        <Link href="/profile">Go to Profile</Link>
    </View>
  )
}

export default App;