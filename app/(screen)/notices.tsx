import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotice } from "../../zustand/noticeService/notice";
import { getNotice } from "../../zustand/types";
import moment from "moment";
import "moment-timezone";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import Iconicons from "react-native-vector-icons/Ionicons";

const Notices = () => {
  const getNotice = useNotice((state) => state.getNotice);
  const [notice, setNotice] = useState<getNotice[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getNotice();
    setNotice(response.data);
  };

  return (
    <SafeAreaView className="bg-slate-100 h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6">
          <View className="flex flex-row items-center">
            <CustomButton
              containerStyles="items-center h-fit"
              handlePress={() => {
                router.push("/home");
              }}
              reactNativeIcons={
                <Iconicons name="arrow-back" color={"#000000"} size={24} />
              }
            />
          </View>
          <Text className="text-3xl text-black mt-6">Notice</Text>
          {notice.length > 0 &&
            notice.map((x, index) => (
              <View
                className="bg-white mt-5 p-4 rounded-lg flex flex-row justify-between"
                key={index}
              >
                <View>
                  <Text className="font-bold">{x.title}</Text>
                  <Text>{x.description}</Text>
                </View>
                <View>
                  <Text className="font-bold">{x.startDate}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notices;
