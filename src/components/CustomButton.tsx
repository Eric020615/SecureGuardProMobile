import { TouchableOpacity, Text } from "react-native";
import React, { ReactElement } from "react";

interface ButtonProps {
  title?: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  reactNativeIcons?: ReactElement;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
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
      {reactNativeIcons ? reactNativeIcons : null}
      {title && (
        <Text
          className={`text-white font-psemibold text-lg 
        ${textStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
