import { CameraCapturedPicture } from 'expo-camera'
import { readAsStringAsync, cacheDirectory, copyAsync } from 'expo-file-system'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { manipulateAsync } from 'expo-image-manipulator'
import { GeneralFileDto } from '@dtos/application/application.dto'

export const getFile = async (document: DocumentPickerResponse): Promise<GeneralFileDto> => {
	try {
		const tempUri = cacheDirectory + document.name
		await copyAsync({ from: document.uri, to: tempUri })
		const base64 = await readAsStringAsync(tempUri, { encoding: 'base64' })
		const file = {
			fileName: document.name,
			fileData: base64,
			contentType: document.type,
			size: document.size,
		} as GeneralFileDto
		return file
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

export const convertImageToBase64 = async (image: CameraCapturedPicture): Promise<string> => {
	try {
		const manipulateResult = await manipulateAsync(image.uri, [], { compress: 0.2 })
		const base64 = await readAsStringAsync(manipulateResult.uri, { encoding: 'base64' })
		return base64
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}
