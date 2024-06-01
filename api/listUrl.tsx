import { IType } from "../config/constant"

export const listUrl = {
    auth: {
        logIn: {
            path: 'log-in',
            type: IType.post
        },
        signUp: {
            path: 'create-user',
            type: IType.post
        }
    }
}