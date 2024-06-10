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
        },
        checkJwtAuth: {
            path: 'check-auth',
            type: IType.post
        },
    },
    facility: {
        book: {
            path: "facility/book",
            type: IType.post
        },
        getBookingHistory: {
            path: "facility",
            type: IType.get
        },
        cancelBooking: {
            path: "facility/cancel",
            type: IType.put
        }
    },
    notice: {
        getNoticesByResident: {
            path: "resident/notice",
            type: IType.get
        }
    }
}