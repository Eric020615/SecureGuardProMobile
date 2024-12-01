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
					name="parcel/index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="parcel/[id]/index"
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
				{/* face-auth */}
				<Stack.Screen
					name="face-auth/index"
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
					name="facility/[id]/[startDate]/[duration]/[numOfGuest]/check"
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
					name="facility/[id]/index"
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
					name="reset-password/index"
					options={{
						headerShown: false,
					}}
				/>
				{/* card */}
				<Stack.Screen
					name="card/index"
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
