import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { animations } from "@assets/index";

const CustomLoader = () => {
  // reference to the animation without re-rendering
  const animation = useRef<LottieView>(null)
  useEffect(() => {
  }, [])

  return (
    <View className='bg-gray-50 opacity-50 absolute w-full h-full justify-center items-center z-1'>
        <LottieView
            autoPlay
            loop
            ref={animation}
            style={{
                width: 250,
                height: 250,
                backgroundColor: 'transparent'
            }}
            source={animations.loadingEffect}
        />
    </View>
  )
}

export default CustomLoader