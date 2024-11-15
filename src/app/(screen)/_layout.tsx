import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ScreenLayout = () => {
	return (
		<>
			<Stack>
				{/* notice */}
				<Stack.Screen
					name="notice/index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="notice/[id]/index"
					options={{
						headerShown: false,
					}}
				/>
				{/* parcel */}
				<Stack.Screen
					name="parcel"
					options={{
						headerShown: false,
					}}
				/>
				{/* visitor */}
				<Stack.Screen
					name="visitor/create"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="visitor/[id]/index"
					options={{
						headerShown: false,
					}}
				/>
				{/* camera */}
				<Stack.Screen
					name="camera"
					options={{
						headerShown: false,
					}}
				/>
				{/* facility */}
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
				{/* sub user */}
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
				{/* reset password */}
				<Stack.Screen
					name="reset-password"
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
