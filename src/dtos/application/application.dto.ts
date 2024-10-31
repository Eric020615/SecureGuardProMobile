export type GeneralFileDto = {
	fileName: string
	fileData: string
	contentType: string
	size?: number
}

export interface Page<T> {
	data: T[]
	previousCursor?: number
	nextCursor?: number
}
