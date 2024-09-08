import { GeneralFile } from '@zustand/types';
import { CameraCapturedPicture } from 'expo-camera';
import {readAsStringAsync, cacheDirectory, copyAsync} from 'expo-file-system'
import { DocumentPickerResponse } from 'react-native-document-picker';

export const getFile = async (document: DocumentPickerResponse) : Promise<GeneralFile> => {
    try {
        const tempUri = cacheDirectory + document.name;
        await copyAsync({from: document.uri , to: tempUri})
        const base64 = await readAsStringAsync(tempUri, 
            {encoding: "base64"}
        );
        const file = {
            fileName: document.name,
            data: base64
        } as GeneralFile
        return file
    } catch (error) {
        console.log(error)
        throw new Error (
            error
        )
    }
}

export const convertImageToBase64 = async (image: CameraCapturedPicture) : Promise<string> => {
    try {
        const base64 = await readAsStringAsync(image.uri, 
            {encoding: "base64"}
        );
        return base64
    } catch (error) {
        console.log(error)
        throw new Error (
            error
        )
    }
}