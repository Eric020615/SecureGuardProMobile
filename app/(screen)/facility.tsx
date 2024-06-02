import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Iconicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import CustomSwiper from "../../components/CustomSwiper";
import { router } from "expo-router";
import { FacilityList } from "../../config/facilities/index";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Swiper from "react-native-swiper";
import CustomFormField from "../../components/CustomFormField";
import { event } from "cypress/types/jquery";

const Facility = () => {
  const [facility, setFacility] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  useEffect(() => {}, [facility]);

  const onDatePickerChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowCalendar(false);
      return;
    }
    setDate(selectedDate);
    setShowCalendar(false);
  };

  const onStartTimePickerChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowStartTime(false);
      return;
    }
    setShowStartTime(false);
  };

  const onEndTimePickerChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowEndTime(false);
      return;
    }
    setShowEndTime(false);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6">
          <View className="flex flex-row items-center justify-between">
            <CustomButton
              containerStyles="items-center h-fit"
              handlePress={() => {
                router.push("/home");
              }}
              reactNativeIcons={
                <Iconicons name="arrow-back" color={"#000000"} size={24} />
              }
            />
            <CustomButton
              containerStyles="items-center h-fit"
              handlePress={() => {
                router.push("/home");
              }}
              title="View history"
              textStyles="text-sm text-gray-500"
            />
          </View>
          <Text className="text-4xl text-black font-bold mt-6">Facilities</Text>
          <CustomSwiper item={FacilityList} onChangeIndex={setFacility} />
          <View>
            <Text className="text-base font-bold">Select Date</Text>
            <CustomButton
              containerStyles="items-center h-fit bg-primary p-3 w-full mt-3"
              handlePress={() => {
                setShowCalendar(true);
              }}
              title={date.toDateString()}
              textStyles="text-sm text-white"
            />
            {showCalendar && (
              <>
                {Platform.OS === "ios" ? (
                  <DatePicker
                    mode="date"
                    value={date}
                    display="spinner"
                    minimumDate={moment().toDate()}
                    maximumDate={moment().add(2, "week").toDate()}
                    onChange={onDatePickerChange}
                  />
                ) : (
                  <DatePicker
                    onTouchCancel={() => console.log("cancel")}
                    onPointerCancel={() => console.log("cancel")}
                    mode="date"
                    value={date}
                    display="calendar"
                    minimumDate={moment().toDate()}
                    maximumDate={moment().add(2, "week").toDate()}
                    onChange={onDatePickerChange}
                  />
                )}
              </>
            )}
          </View>
          <View className="mt-4">
            <Text className="text-base font-bold">Start Time</Text>
            <CustomButton
              containerStyles="items-center h-fit bg-primary p-3 w-full mt-3"
              handlePress={() => {
                setShowStartTime(true);
              }}
              title={date.toDateString()}
              textStyles="text-sm text-white"
            />
            {showStartTime && (
              <>
                {Platform.OS === "ios" ? (
                  <DatePicker
                    mode="time"
                    value={date}
                    display="spinner"
                    is24Hour={true}
                    onChange={onStartTimePickerChange}
                  />
                ) : (
                  <DatePicker
                    mode="time"
                    value={date}
                    display="spinner"
                    is24Hour={true}
                    onChange={onStartTimePickerChange}
                  />
                )}
              </>
            )}
          </View>
          <View className="mt-4">
            <Text className="text-base font-bold">End Time</Text>
            <CustomButton
              containerStyles="items-center h-fit bg-primary p-3 w-full mt-3"
              handlePress={() => {
                setShowEndTime(true);
              }}
              title={date.toDateString()}
              textStyles="text-sm text-white"
            />
            {showEndTime && (
              <>
                {Platform.OS === "ios" ? (
                  <DatePicker
                    mode="time"
                    value={date}
                    display="spinner"
                    is24Hour={true}
                    onChange={onEndTimePickerChange}
                  />
                ) : (
                  <DatePicker
                    mode="time"
                    value={date}
                    display="spinner"
                    is24Hour={true}
                    onChange={onEndTimePickerChange}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Facility;
