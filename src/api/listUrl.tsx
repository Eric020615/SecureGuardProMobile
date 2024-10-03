import { IType } from "@config/constant"

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
    faceAuth: {
        create: {
            path: "face-auth/user/upload",
            type: IType.post
        }
    },
    user: {
        createUser: {
            path: 'user/create/',
            type: IType.post
        },
        getUserProfileById: {
            path: 'user/profile/',
            type: IType.get
        },
        editUserProfileById: {
            path: 'user/profile/',
            type: IType.put
        }
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
        },
        checkAvailabilitySlot: {
            path: "facility/available-slot/check",
            type: IType.get
        },
    },
    notice: {
        getNoticesByResident: {
            path: "notice/",
            type: IType.get
        }
    },
    visitor: {
        createVisitor: {
            path: "visitor/create/",
            type: IType.post
        },
        editVisitorById: {
            path: "visitor/edit/",
            type: IType.put
        },
        getVisitors: {
            path: "visitor/",
            type: IType.get
        },
        getVisitorDetailsById: {
            path: "visitor/details",
            type: IType.get
        }
    }
}