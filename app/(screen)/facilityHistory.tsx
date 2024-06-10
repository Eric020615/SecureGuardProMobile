import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import Iconicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFacility } from "../../zustand/facilityService/facility";
import { getBookingHistory } from "../../zustand/types";
import { FacilityName } from "../../config/facilities";
import moment from "moment";
import "moment-timezone";

const facilityHistory = () => {
  const getBookingHistory = useFacility((state) => state.getBookingHistory);
  const cancelBooking = useFacility((state) => state.cancelBooking);
  const [isPast, setIsPast] = useState(true);
  const [bookingHistory, setBookingHistory] = useState<getBookingHistory[]>([]);

  useEffect(() => {
    getData(isPast);
  }, []);

  useEffect(() => {
    getData(isPast);
  }, [isPast]);

  const getData = async (isPast: boolean) => {
    const response = await getBookingHistory(isPast);
    setBookingHistory(response.data);
  };

  const cancel = async (bookingId: string) => {
    console.log(bookingId)
    const response = await cancelBooking(bookingId);
    if (response.success) {
      router.push("/facilityHistory");
    } else {
      Alert.alert(response.msg);
    }
  }
 
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
              containerStyles={`${
                isPast ? "bg-primary" : "bg-white"
              } p-2 mr-5 flex-1 rounded-2xl`}
              handlePress={() => {
                setIsPast(!isPast);
              }}
              title="Past"
              textStyles={`text-base ${
                isPast ? "text-white" : "text-primary"
              } `}
            />
            <CustomButton
              containerStyles={`${
                !isPast ? "bg-primary" : "bg-white"
              } p-2 flex-1 rounded-2xl`}
              handlePress={() => {
                setIsPast(!isPast);
              }}
              title="Upcoming"
              textStyles={`text-base ${
                !isPast ? "text-white" : "text-primary"
              } `}
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
                      {moment(x.startDate)
                        .tz("Asia/Kuala_Lumpur")
                        .format("DD MMM YYYY, HH:mm")}
                    </Text>
                    <Text>-</Text>
                    <Text className="">
                      {moment(x.endDate)
                        .tz("Asia/Kuala_Lumpur")
                        .format("HH:mm")}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="font-bold">{x.numOfGuest} Guests(s)</Text>
                  {x.isCancelled ? (
                    <Text className="bg-red-500 text-xs text-white rounded-lg text-center mt-1">Cancelled</Text>
                  ): (
                    moment(x.startDate).tz("Asia/Kuala_Lumpur") >
                      moment().tz("Asia/Kuala_Lumpur") && (
                      <CustomButton
                        containerStyles="flex flex-row self-end h-fit mt-1"
                        handlePress={() => {
                          cancel(x.bookingId);
                        }}
                        reactNativeIcons={
                          <Iconicons
                            name="close-circle"
                            color={"#ff0000"}
                            size={16}
                          />
                        }
                      />
                    )
                  )}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default facilityHistory;
