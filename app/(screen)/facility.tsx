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
import { FacilityList, GuestList } from "../../config/facilities/index";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FacilityBookingForm } from "../../zustand/types";
import { Picker } from "@react-native-picker/picker";

interface FacilityBooking {
  facility: number,
  startDate: Date,
  endDate: Date,
  numGuest: number
}

const Facility = () => {
  const [facility, setFacility] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [facilityBooking, setFacilityBooking] = useState<FacilityBooking>({
    facility: facility,
    startDate: new Date(),
    endDate: new Date(),
    numGuest: 0 
  })
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    facility: Yup.number().required(),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
    numGuests: Yup.number().required()
  });

  const formik = useFormik<FacilityBooking>({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: facilityBooking,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("hello2")
      console.log(formik.values)
    },
  });

  useEffect(() => {
    formik.setFieldValue("facility", facility);
  }, [facility]);

  const onDatePickerChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowCalendar(false);
      return;
    }
    formik.setFieldValue("startDate", selectedDate);
    setShowCalendar(false);
  };

  const onStartTimePickerChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowStartTime(false);
      return;
    }
    formik.setFieldValue("startDate", selectedTime);
    setShowStartTime(false);
  };

  const onEndTimePickerChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowEndTime(false);
      return;
    }
    formik.setFieldValue("endDate", selectedTime);
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
              title={formik.values.startDate.toDateString()}
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
          <View className="flex flex-row gap-3 mt-1">
            <View className="flex-1">
              <Text className="text-base font-bold">Start Time</Text>
              <CustomButton
                containerStyles="items-center h-fit bg-primary p-3 mt-3"
                handlePress={() => {
                  setShowStartTime(true);
                }}
                title={moment(formik.values.startDate).format("HH:mm")}
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
            <View className="flex-1">
              <Text className="text-base font-bold">End Time</Text>
              <CustomButton
                containerStyles="items-center h-fit bg-primary p-3 mt-3"
                handlePress={() => {
                  setShowEndTime(true);
                }}
                title={moment(formik.values.endDate).format("HH:mm")}
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
          <View>
            <Text className="text-base font-bold mt-4">Number of Guests</Text>
            <Picker
              selectedValue={formik.values.numGuest}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("numGuest", itemValue);
              }}
            >
              {
                GuestList.map((x) => (
                  <Picker.Item label={x.title} value={x.num} />
                ))
              }
            </Picker>
          </View>
          <CustomButton
            title="Submit"
            handlePress={formik.handleSubmit}
            containerStyles="border-primary border bg-white p-3 w-full mt-2 flex flex-row self-center"
            isLoading={isSubmitting}
            textStyles="text-sm text-primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Facility;
