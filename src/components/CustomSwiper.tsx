import { View, Image, SafeAreaView } from "react-native";
import React, { Dispatch, SetStateAction, useId, useState } from "react";
import Swiper from "react-native-swiper-flatlist";
import { FacilityList } from "../config/facilities";

// const zoomIn = {
//   0: {
//     scale: 0.9,
//   },
//   1: {
//     scale: 1,
//   },
// };

// const zoomOut = {
//   0: {
//     scale: 1,
//   },
//   1: {
//     scale: 0.9,
//   },
// };

interface CustomSwiperProps {
  item: any[];
  onChangeIndex: Dispatch<SetStateAction<string>>
}

const CustomSwiper = ({ item, onChangeIndex }: CustomSwiperProps) => {
  return (
    <SafeAreaView>
      <Swiper 
        onChangeIndex={
          (change) => { 
            FacilityList.forEach((x) => {
              if(x.key == change.index){
                onChangeIndex(x.name);
              }
            })
          }
        }
        className="max-h-64 my-4"
      >
        {item.map((x, index) => (
          <View key={index}>
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
