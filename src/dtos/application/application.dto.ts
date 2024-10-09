export type GeneralFile = {
	fileName: string
	data: string
}

export interface Page<T> {
	data: T[]
	previousCursor?: number
	nextCursor?: number
}
