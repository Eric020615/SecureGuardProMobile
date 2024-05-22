import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants/index"
import { useFormik, FormikErrors } from 'formik'

interface CustomFormFieldProps {
  title: String
  value: any
  handleChangeText: (e: any) => void
  placeholder? : any
  containerStyle?: string
  onBlur?: (value? : any) => void
  errorMessage?: any
  isSecureTextEntry? : boolean
}

const CustomFormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  containerStyle,
  onBlur,
  errorMessage,
  isSecureTextEntry
} : CustomFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${containerStyle}`}>
      <Text className='text-base text-black'>
        {title}
      </Text>
      <View className={`border-2 w-full h-14 px-4 
      bg-white rounded-2xl focus:border-secondary items-center 
      flex-row`}>
        <TextInput
          className='flex-1 text-black text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={isSecureTextEntry && !showPassword}
          onBlur={onBlur}
        />
        {isSecureTextEntry && (
          <TouchableOpacity onPress={
            () => setShowPassword(!showPassword)}>
              <Image 
                source={
                  !showPassword ? 
                  icons.eye : 
                  icons.eyeHide 
                } 
                className='w-6 h-6'
                resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text className='text-red-700'>
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

export default CustomFormField