import { IType } from "../config"

export const listUrl = {
    auth: {
        logIn: {
            path: 'auth/log-in/',
            type: IType.post
        },
        signUp: {
            path: 'auth/sign-up/',
            type: IType.post
        },
        checkJwtAuth: {
            path: 'auth/check-auth/',
            type: IType.get
        },
    },
    facility: {
        facilityBooking: {
            path: "facility/create/",
            type: IType.post
        },
        getFacilityBookingHistory: {
            path: "facility/",
            type: IType.get
        },
        cancelFacilityBooking: {
            path: "facility/cancel/",
            type: IType.put
        }
    },
    notice: {
        getNoticesByResident: {
            path: "notice/",
            type: IType.get
        }
    }
}