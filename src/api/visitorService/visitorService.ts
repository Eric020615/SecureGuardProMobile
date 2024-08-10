import { CreateVisitorDto, GetVisitorDto } from "@zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createVisitor = async (IVisitor: CreateVisitorDto) : Promise<any> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.visitor.createVisitor.path,
            type: listUrl.visitor.createVisitor.type,
            data: IVisitor,
            _token: token
        })
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': data?.message,
            data: success ? data?.data : undefined
        }
        return result;
    } catch (error) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}

export const getVisitorById = async (isPast: boolean): Promise<IResponse<GetVisitorDto[]>> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.visitor.getVisitorById.path,
            type: listUrl.visitor.getVisitorById.type,
            data: {
                isPast: isPast
            },
            _token: token
        })
        const result : IResponse<GetVisitorDto[]> = {
            success,
            msg: success ? 'success': response?.message,
            data: success ? response?.data : undefined
        }
        return result;
    } catch (error) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}