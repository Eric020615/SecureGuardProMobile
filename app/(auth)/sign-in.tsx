import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFormField from "../../components/CustomFormField";
import { useFormik } from "formik";
import * as Yup from "yup";
import FIREBASE from "../../config/FirebaseConfig";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { signInformDataJson } from "../../config/constant/auth/index";
import { signInWithEmailAndPassword } from "firebase/auth";

interface SignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const auth = FIREBASE.FIREBASE_AUTH;
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<SignInForm>({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: signInformDataJson,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signIn();
    },
  });

  const signIn = async () => {
    setIsSubmitting(true);
    try {
      const response = await signInWithEmailAndPassword(auth, formik.values.email, formik.values.password);
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
          <Text className="text-7xl w-full font-bold text-primary">Log in</Text>
          <CustomFormField
            title="Email"
            value={formik.values.email}
            handleChangeText={(e) => {
              formik.setFieldValue("email", e)
            }}
            errorMessage={formik.errors.email}
          />
          <CustomFormField
            title="Password"
            containerStyle="mt-3"
            value={formik.values.password}
            handleChangeText={(e) => {
              formik.setFieldValue("password", e)
            }}
            errorMessage={formik.errors.password}
            isSecureTextEntry={true}
          />
          <CustomButton
            title='Log In' 
            handlePress={formik.handleSubmit} 
            containerStyles='bg-primary p-3 w-full mt-7'
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-sm font-pregular">
              Don't have account? 
            </Text>
            <Link href="/sign-up" className="text-sm font-psemibold text-primary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
