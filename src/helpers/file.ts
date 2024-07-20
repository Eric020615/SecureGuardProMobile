import RNFS from 'react-native-fs'

export const convertFileToBase64 = async (uri: string) => {
    try {
        const base64 = await RNFS.readFile(uri, 'base64');
        return base64
    } catch (error) {
        throw new Error (
            error
        )
    }
}
