import { FlatList, ListRenderItem, Text, View, ViewStyle } from 'react-native'
import { ReactElement, useMemo } from 'react'
import CustomDataNotFound from '@components/dataNotFound/CustomDataNotFound'

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
			onEndReachedThreshold={0.5}
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
	)
}

export default CustomFlatList
