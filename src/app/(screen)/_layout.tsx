import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ScreenLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="facility"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="facilityHistory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notices"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="package"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="createVisitor"
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="visitorDetails/[id]/[pageMode]"
          options={{
            headerShown: false,
          }
        }
        />
      </Stack>

      <StatusBar backgroundColor="#10312B" style="light" />
    </>
  );
};

export default ScreenLayout;
