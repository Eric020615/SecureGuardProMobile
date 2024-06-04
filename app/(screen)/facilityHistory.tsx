import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import Iconicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFacility } from "../../zustand/facilityService/facility";
import { getBookingHistory } from "../../zustand/types";
import { FacilityName } from "../../config/facilities";
import moment from "moment";

const facilityHistory = () => {
  const getBookingHistory = useFacility((state) => state.getBookingHistory);
  const [isPast, setIsPast] = useState(true)
  const [bookingHistory, setBookingHistory] = useState<getBookingHistory[]>([]);

  useEffect(() => {
    getData(isPast);
  }, []);
  
  useEffect(() => {
    getData(isPast)
  }, [isPast])

  const getData = async (isPast: boolean) => {
    const response = await getBookingHistory(isPast);
    setBookingHistory(response.data);
  };

  return (
    <SafeAreaView className="bg-slate-100 h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6">
          <View className="flex flex-row items-center">
            <CustomButton
              containerStyles="items-center h-fit"
              handlePress={() => {
                router.push("/facility");
              }}
              reactNativeIcons={
                <Iconicons name="arrow-back" color={"#000000"} size={24} />
              }
            />
          </View>
          <Text className="text-4xl text-black font-bold mt-6">
            Booking History
          </Text>
          <View className="flex flex-row justify-between mt-5">
            <CustomButton
              containerStyles={`${isPast ? "bg-primary": "bg-white"} p-2 mr-5 flex-1 rounded-2xl`}
              handlePress={() => {setIsPast(!isPast)}}
              title="Past"
              textStyles={`text-base ${isPast ? "text-white" : "text-primary"} `}
            />
            <CustomButton
              containerStyles={`${!isPast ? "bg-primary": "bg-white"} p-2 flex-1 rounded-2xl`}
              handlePress={() => {setIsPast(!isPast)}}
              title="Upcoming"
              textStyles={`text-base ${!isPast ? "text-white" : "text-primary"} `}
            />
          </View>
          {bookingHistory.length > 0 &&
            bookingHistory.map((x, index) => (
              <View
                className="bg-white mt-5 p-4 rounded-lg flex flex-row justify-between"
                key={index}
              >
                <View>
                  <Text className="font-bold">
                    {FacilityName[x.facilityId]}
                  </Text>
                  <View className="flex flex-row gap-1">
                    <Text className="">
                        {moment(x.startDate.substring(0, 21)).format("d MMM YYYY, hh:mm")}
                    </Text>
                    <Text>
                        -
                    </Text>
                    <Text className="">
                        {moment(x.endDate.substring(0, 21)).format("hh:mm")}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="font-bold">{x.numOfGuest} Guests(s)</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default facilityHistory;
