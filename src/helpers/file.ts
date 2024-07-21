import {readAsStringAsync, EncodingType, cacheDirectory, copyAsync} from 'expo-file-system'

export const convertFileToBase64 = async (uri: string) : Promise<string> => {
    try {
        const tempUri = cacheDirectory + 'temp_img';
        await copyAsync({from: uri , to: tempUri})
        console.log("hello22255")
        console.log(tempUri)
        const base64 = await readAsStringAsync(tempUri, 
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
