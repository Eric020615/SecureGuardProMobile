import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFormField from "@components/CustomFormField";
import { userInforformDataJson } from "@config/auth";
import { Link } from "expo-router";
import CustomButton from "@components/CustomButton";
import { useUser } from "@zustand/userService/user";

interface UserInformationForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  unitNumber: string;
  birthDay: string;
  gender: string;
}

const UserInformation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName:  Yup.string().required("Last Name is required"),
    phoneNumber:  Yup.string().required("Phone Number is required"),
    unitNumber:  Yup.string().required("Unit Number is required"),
    birthDay:  Yup.string().required("BirthDay is required"),
    gender:  Yup.string().required("Gender is required")
  });
  const formik = useFormik<UserInformationForm>({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: userInforformDataJson,
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const userInformation = useUser();

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="items-center p-5">
            <Text className="text-5xl font-bold text-primary">Sign Up</Text>
            <Text className="text-xl font-pregular text-primary">We need something more</Text>
          </View>
          <View className="flex flex-row my-3">
            <CustomFormField
                title="Firstname"
                containerStyle="flex-1 mr-2"
                value={formik.values.firstName}
                handleChangeText={(e) => {
                formik.setFieldValue("firstName", e);
                }}
                onBlur={formik.handleBlur("firstName")}
                errorMessage={formik.errors.firstName}
            />
            <CustomFormField
                title="Lastname"
                containerStyle="flex-1"
                value={formik.values.lastName}
                handleChangeText={(e) => {
                formik.setFieldValue("lastName", e);
                }}
                onBlur={formik.handleBlur("lastName")}
                errorMessage={formik.errors.lastName}
            />
          </View>
          <CustomFormField
            title="Phone No."
            containerStyle="mb-3"
            value={formik.values.phoneNumber}
            handleChangeText={(e) => {
              formik.setFieldValue("phoneNumber", e);
            }}
            onBlur={formik.handleBlur("phoneNumber")}
            errorMessage={formik.errors.phoneNumber}
          />
          <CustomFormField
            title="Choose your unit no."
            containerStyle="mb-3"
            value={formik.values.unitNumber}
            handleChangeText={(e) => {
              formik.setFieldValue("unitNumber", e);
            }}
            onBlur={formik.handleBlur("unitNumber")}
            errorMessage={formik.errors.unitNumber}
          />
          <CustomFormField
            title="BirthDay"
            value={formik.values.birthDay}
            containerStyle="mb-3"
            handleChangeText={(e) => {
              formik.setFieldValue("birthDay", e);
            }}
            onBlur={formik.handleBlur("birthDay")}
            errorMessage={formik.errors.birthDay}
          />
          <CustomFormField
            title="Gender"
            value={formik.values.gender}
            containerStyle="mb-3"
            handleChangeText={(e) => {
              formik.setFieldValue("gender", e);
            }}
            onBlur={formik.handleBlur("gender")}
            errorMessage={formik.errors.gender}
          />
          <CustomButton
            title="Submit"
            handlePress={formik.handleSubmit}
            containerStyles="bg-primary p-3 w-full mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserInformation;
