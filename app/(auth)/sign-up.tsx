import { View, Text, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFormField from "../../components/CustomFormField";
import CustomButton from "../../components/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "expo-router";
import { signUpformDataJson } from "../../config/constant/auth/index";
import FIREBASE from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface UserSignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required("Email is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
  });
  const auth = FIREBASE.FIREBASE_AUTH;
  const formik = useFormik<UserSignUpForm>({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: signUpformDataJson,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signIn();
    },
  });
  const signIn = async () => {
    setIsSubmitting(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-3xl text-black">Gate Mate</Text>
          <Text className="text-7xl w-full font-bold text-primary">
            Sign Up
          </Text>
          <CustomFormField
            title="Email"
            value={formik.values.email}
            handleChangeText={(e) => {
              formik.setFieldValue('email', e)
            }}
            onBlur={formik.handleBlur('email')}
            errorMessage={formik.errors.email}
          />
          <CustomFormField
            title="Password"
            value={formik.values.password}
            handleChangeText={(e) => {
              formik.setFieldValue('password', e)
            }}
            containerStyle="mt-3"
            onBlur={formik.handleBlur('password')}
            errorMessage={formik.errors.password}
            isSecureTextEntry={true}
          />
          <CustomFormField
            title="Confirm Password"
            value={formik.values.confirmPassword}
            handleChangeText={(e) => {
              formik.setFieldValue('confirmPassword', e)
            }}
            containerStyle="mt-3"
            onBlur={formik.handleBlur('confirmPassword')}
            errorMessage={formik.errors.confirmPassword}
            isSecureTextEntry={true}
          />
          <CustomButton
            title='Sign Up' 
            handlePress={formik.handleSubmit} 
            containerStyles='bg-primary p-3 w-full mt-7'
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-sm font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-sm font-psemibold text-primary">Log In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
