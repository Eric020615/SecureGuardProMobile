import {
	FlatList,
	ListRenderItem,
	Text,
	ViewStyle,
} from 'react-native'
import { useMemo } from 'react'

interface CustomFlatListProps<T> {
	data: T[]
	renderItem: ListRenderItem<T>
	fetchNextPage: () => void
	loading: boolean
    isRefreshing?: boolean
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
    isRefreshing = false,
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
	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			contentContainerStyle={flatListContentStyle}
			columnWrapperStyle={columnWrapperStyle}
			onEndReached={() => {
                if(loading) return
				fetchNextPage()
			}}
			onEndReachedThreshold={0.5}
            ListHeaderComponent={() => <></>}
			ListFooterComponent={() => <Text className="self-center text-sm text-black">Load more</Text>}
            refreshing={isRefreshing}
			onRefresh={() => {
                if(loading) return
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
