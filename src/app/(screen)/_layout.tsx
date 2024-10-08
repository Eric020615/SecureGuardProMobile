import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ScreenLayout = () => {
	return (
		<>
			<Stack>
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
					name="visitor/create"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="visitor/visitorDetails/[id]/[pageMode]"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="camera"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="facility/create"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="facility/history"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="facility/[facilityId]/[startDate]/[duration]/[numOfGuest]/check"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="sub-user/index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="sub-user/create"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>

			<StatusBar backgroundColor="#10312B" style="light" />
		</>
	)
}

export default ScreenLayout
