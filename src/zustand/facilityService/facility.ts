import { create } from "zustand"
import { FacilityBookingFormDto } from "../types"
import { cancelBooking, getFacilityBookingHistory, submitBooking } from "../../api/facilityService/facilityService"

const application = (set, get) => ({
    submitBooking: async (facilityBookingForm: FacilityBookingFormDto) => {
        try {
            const response = await submitBooking(facilityBookingForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getFacilityBookingHistory: async (isPast: boolean) => {
        try {
            const response = await getFacilityBookingHistory(isPast);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    cancelBooking: async (bookingId: string) => {
        try {
            const response = await cancelBooking(bookingId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useFacility = create(application)