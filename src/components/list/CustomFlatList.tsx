import { FlatList, ListRenderItem, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import CustomDataNotFound from '@components/dataNotFound/CustomDataNotFound'
import { Menu, MenuItem } from 'react-native-material-menu' // Example of a dropdown library
import Ionicons from 'react-native-vector-icons/Ionicons' // Import the icon set you want to use

interface CustomFlatListProps<T> {
	data: T[]
	renderItem: ListRenderItem<T>
	fetchNextPage?: () => void
	loading: boolean
	isRefreshing?: boolean
	onRefresh: () => void
	itemHeight?: number
	numColumns?: number
	gap?: number
	columnWrapperStyle?: ViewStyle
	listFooterComponent?: ReactElement
}

const CustomFlatList = <T extends object>({
	data,
	renderItem,
	fetchNextPage,
	loading,
	isRefreshing = false,
	onRefresh,
	itemHeight = 100, // Default item height
	numColumns = 1,
	gap = 10,
	columnWrapperStyle,
	listFooterComponent,
}: CustomFlatListProps<T>) => {
	if (loading) {
		return (
			<View className="items-center justify-center flex-1">
				<Text className="text-gray-500 text-lg">Loading...</Text>
			</View>
		)
	}
	if (data.length === 0) {
		return (
			<View className="items-center justify-center flex-1">
				<CustomDataNotFound />
				<Text className="text-black font-psemibold text-lg">No Records</Text>
			</View>
		)
	}
	const flatListContentStyle = useMemo(() => ({ gap }), [gap])
	return (
		<View className="flex-1">
			<FlatList
				data={data}
				renderItem={renderItem}
				contentContainerStyle={flatListContentStyle}
				columnWrapperStyle={columnWrapperStyle}
				onEndReached={() => {
					if (loading) return
					if (fetchNextPage == undefined) return
					fetchNextPage()
				}}
				onEndReachedThreshold={0.1}
				ListHeaderComponent={() => <></>}
				ListFooterComponent={() => listFooterComponent}
				refreshing={isRefreshing}
				onRefresh={() => {
					if (loading) return
					onRefresh()
				}}
				numColumns={numColumns}
				initialNumToRender={10}
				getItemLayout={(_data, index) => ({
					length: itemHeight,
					offset: (itemHeight + gap) * index,
					index,
				})}
			/>
		</View>
	)
}

export default CustomFlatList
