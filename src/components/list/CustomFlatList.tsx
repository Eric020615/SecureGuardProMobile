import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	ViewStyle,
	useWindowDimensions,
} from 'react-native'
import { useMemo, useRef } from 'react'

interface CustomFlatListProps<T> {
	data: T[]
	renderItem: ListRenderItem<T>
	fetchNextPage: () => void
	loading: boolean
	onRefresh: () => void
	itemHeight?: number
	numColumns?: number
	gap?: number
	columnWrapperStyle?: ViewStyle
}

const CustomFlatList = <T extends object>({
	data,
	renderItem,
	fetchNextPage,
	loading,
	onRefresh,
	itemHeight = 100, // Default item height
	numColumns = 1,
	gap = 10,
	columnWrapperStyle,
}: CustomFlatListProps<T>) => {
	if (data.length === 0) {
		return null
	}
	const flatListContentStyle = useMemo(() => ({ gap }), [gap])
	// Use case: increase impression count for posts
	// that are visible on the screen for more than 0.5 seconds
	const viewabilityConfigCallbackPairs = useRef([
		{
			viewabilityConfig: {
				minimumViewTime: 500,
				itemVisiblePercentThreshold: 50,
			},
			onViewableItemsChanged: ({ changed }) => {
				changed.forEach((changedItem) => {
					if (changedItem.isViewable) {
						console.log('++ Impression for: ', changedItem.item.id)
					}
				})
			},
		},
	])

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			contentContainerStyle={flatListContentStyle}
			columnWrapperStyle={columnWrapperStyle}
			onEndReached={() => {
                if (data.length >= 10) { // Check if there are at least 5 items
                    fetchNextPage();
                }
            }}
			onEndReachedThreshold={0.5}
			ListFooterComponent={() => loading && <ActivityIndicator />}
			refreshing={loading}
			onRefresh={onRefresh}
			numColumns={numColumns}
			initialNumToRender={10}
			getItemLayout={(_data, index) => ({
				length: itemHeight,
				offset: (itemHeight + gap) * index,
				index,
			})}
			viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
		/>
	)
}

export default CustomFlatList
