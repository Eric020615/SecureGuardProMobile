import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
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
import "moment-timezone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFacility } from "../../zustand/facilityService/facility";
import { Picker } from "@react-native-picker/picker";

interface FacilityBooking {
  facilityId: string;
  startDate: Date;
  endDate: Date;
  numofGuest: number;
}

const Facility = () => {
  const [facilityId, setFacilityId] = useState("BC");
  const [facilityBooking, setFacilityBooking] = useState<FacilityBooking>({
    facilityId: facilityId,
    startDate: new Date(),
    endDate: null,
    numofGuest: 1,
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEndTimeTouched, setisEndTimeTouched] = useState(false);

  const validationSchema = Yup.object().shape({
    facilityId: Yup.string().required("Date is required"),
    startDate: Yup.date().required("Start time is required"),
    endDate: Yup.date()
      .required("End time is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    numofGuest: Yup.number().required("Number of guest is required"),
  });

  const formik = useFormik<FacilityBooking>({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: facilityBooking,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await submitBooking({
        facilityId: formik.values.facilityId,
        startDate: formik.values.startDate.toISOString(),
        endDate: formik.values.endDate.toISOString(),
        numOfGuest: formik.values.numofGuest,
      });
      if (response.success) {
        formik.resetForm();
        router.push("/facilityHistory");
      } else {
        Alert.alert(response.msg);
      }
      setIsSubmitting(false);
    },
  });

  const submitBooking = useFacility((state) => state.submitBooking);

  useEffect(() => {
    formik.setFieldValue("facilityId", facilityId);
  }, [facilityId]);

  const onDatePickerChange = (event, selectedDate: Date) => {
    formik.handleBlur("startDate");
    if (event.type === "dismissed") {
      setShowCalendar(false);
      return;
    }
    formik.setFieldValue("startDate", selectedDate);
    formik.setFieldValue("endDate", selectedDate);
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
    setisEndTimeTouched(true);
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
                router.push("/facilityHistory");
              }}
              title="View history"
              textStyles="text-sm text-gray-500"
            />
          </View>
          <Text className="text-4xl text-black font-bold mt-6">Facilities</Text>
          <CustomSwiper item={FacilityList} onChangeIndex={setFacilityId} />
          <View>
            <Text className="text-base font-bold">Select Date</Text>
            <CustomButton
              containerStyles="items-center h-fit bg-primary p-3 w-full mt-3"
              handlePress={() => {
                setShowCalendar(true);
              }}
              title={
                formik.values.startDate
                  ? moment(formik.values.startDate).tz("Asia/Kuala_Lumpur").format("DD MMM YYYY")
                  : "-"
              }
              textStyles="text-sm text-white"
            />
            {showCalendar && (
              <>
                {Platform.OS === "ios" ? (
                  <DatePicker
                    mode="date"
                    timeZoneName="Asia/Kuala_Lumpur"
                    value={
                      formik.values.startDate
                        ? formik.values.startDate
                        : new Date()
                    }
                    display="spinner"
                    minimumDate={moment().tz("Asia/Kuala_Lumpur").toDate()}
                    maximumDate={moment()
                      .tz("Asia/Kuala_Lumpur")
                      .add(2, "week")
                      .toDate()}
                    onChange={onDatePickerChange}
                  />
                ) : (
                  <DatePicker
                    mode="date"
                    timeZoneName="Asia/Kuala_Lumpur"
                    value={
                      formik.values.startDate
                        ? formik.values.startDate
                        : new Date()
                    }
                    display="calendar"
                    minimumDate={moment().tz("Asia/Kuala_Lumpur").toDate()}
                    maximumDate={moment()
                      .tz("Asia/Kuala_Lumpur")
                      .add(2, "week")
                      .toDate()}
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
                title={
                  formik.values.startDate
                    ? moment(formik.values.startDate)
                        .tz("Asia/Kuala_Lumpur")
                        .format("HH:mm")
                    : "-"
                }
                textStyles="text-sm text-white"
              />
              {showStartTime && (
                <>
                  {Platform.OS === "ios" ? (
                    <DatePicker
                      timeZoneName="Asia/Kuala_Lumpur"
                      mode="time"
                      value={
                        formik.values.startDate
                          ? formik.values.startDate
                          : moment().toDate()
                      }
                      display="spinner"
                      is24Hour={true}
                      onChange={onStartTimePickerChange}
                    />
                  ) : (
                    <DatePicker
                      timeZoneName="Asia/Kuala_Lumpur"
                      mode="time"
                      value={
                        formik.values.startDate
                          ? formik.values.startDate
                          : moment().toDate()
                      }
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
                title={
                  formik.values.endDate
                    ? moment(formik.values.endDate)
                        .tz("Asia/Kuala_Lumpur")
                        .format("HH:mm")
                    : "-"
                }
                textStyles="text-sm text-white"
              />
              {showEndTime && (
                <>
                  {Platform.OS === "ios" ? (
                    <DatePicker
                      timeZoneName="Asia/Kuala_Lumpur"
                      mode="time"
                      value={
                        formik.values.endDate
                          ? formik.values.endDate
                          : new Date()
                      }
                      display="spinner"
                      is24Hour={true}
                      onChange={onEndTimePickerChange}
                    />
                  ) : (
                    <DatePicker
                      timeZoneName="Asia/Kuala_Lumpur"
                      mode="time"
                      value={
                        formik.values.endDate
                          ? formik.values.endDate
                          : new Date()
                      }
                      display="spinner"
                      is24Hour={true}
                      onChange={onEndTimePickerChange}
                    />
                  )}
                </>
              )}
              {isEndTimeTouched && formik.errors.endDate && (
                <Text className="text-red-700 text-xs">
                  {formik.errors.endDate as string}
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text className="text-base font-bold mt-4">Number of Guests</Text>
            <Picker
              selectedValue={formik.values.numofGuest}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("numofGuest", itemValue);
              }}
              onBlur={formik.handleBlur("numofGuest")}
            >
              {GuestList.map((x) => (
                <Picker.Item key={x.num} label={x.title} value={x.num} />
              ))}
            </Picker>
            {formik.touched.numofGuest && formik.errors.numofGuest && (
              <Text className="text-red-700">
                {formik.errors.numofGuest as string}
              </Text>
            )}
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
