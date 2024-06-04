import { create } from "zustand"
import { FacilityBookingForm } from "../types"
import { getBookingHistory, submitBooking } from "../../api/facilityService/facilityService"

const application = (set, get) => ({
    submitBooking: async (facilityBookingForm: FacilityBookingForm) => {
        try {
            const response = await submitBooking(facilityBookingForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getBookingHistory: async (isPast: boolean) => {
        try {
            const response = await getBookingHistory(isPast);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useFacility = create(application)