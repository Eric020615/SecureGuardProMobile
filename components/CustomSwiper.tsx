import { View, Text, FlatList, Image, SafeAreaView, ImageBackground } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Swiper from "react-native-swiper-flatlist";
import { images } from "../assets/index";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

interface CustomSwiperProps {
  item: any[];
  onChangeIndex: Dispatch<SetStateAction<number>>
}

const CustomSwiper = ({ item, onChangeIndex }: CustomSwiperProps) => {
  
  return (
    <SafeAreaView>
      <Swiper 
        onChangeIndex={
          (index) => { 
            onChangeIndex(index.index)
          }
        }
        className="max-h-64 my-4"
      >
        {item.map((x) => (
          <View>
            <Image 
              source={x.image} 
              resizeMode="contain" 
              className="max-w-[380px] max-h-64 rounded-lg"/>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default CustomSwiper;
