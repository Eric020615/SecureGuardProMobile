import { TouchableOpacity, Text, View } from "react-native";
import React, { ReactElement } from "react";

interface ButtonProps {
  title?: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  iconStyles?: string;
  isLoading?: boolean;
  reactNativeIcons?: ReactElement;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  iconStyles,
  isLoading,
  reactNativeIcons,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl justify-center 
      items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
       {title && (
        <Text
          className={`text-white font-psemibold text-lg self-center
        ${textStyles}`}
        >
          {title}
        </Text>
      )}
      {reactNativeIcons ? 
        <View className={`${iconStyles}`}>
          {reactNativeIcons}
        </View> : null}
    </TouchableOpacity>
  );
};

export default CustomButton;
