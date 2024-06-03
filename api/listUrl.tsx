import { IType } from "../config"

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
    },
    facility: {
        book: {
            path: "facility/book",
            type: IType.post
        }
    }
}