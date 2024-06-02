import { IType } from "../config/constant"

export const listUrl = {
    auth: {
        logIn: {
            path: 'log-in',
            type: IType.post
        },
        signUp: {
            path: 'sign-up',
            type: IType.post
        }
    }
}