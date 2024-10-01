import { create } from "zustand"
import { FacilityBookingFormDto } from "../types"
import { cancelBooking, getFacilityBookingHistory, submitBooking } from "@api/facilityService/facilityService"

interface facilityState {
    isLoading: boolean;
    error: string | null;
    submitBooking: (facilityBookingForm: FacilityBookingFormDto) => Promise<any>;
    getFacilityBookingHistory: (isPast: boolean, page: number, limit: number) => Promise<any>;
    cancelBooking: (bookingGuid: string) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useFacility = create<facilityState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    submitBooking: async (facilityBookingForm: FacilityBookingFormDto) => {
        try {
            set({ isLoading: true, error: null });
            console.log(facilityBookingForm)
            const response = await submitBooking(facilityBookingForm);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    getFacilityBookingHistory: async (isPast: boolean, page: number, limit: number) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getFacilityBookingHistory(isPast, page, limit);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    cancelBooking: async (bookingGuid: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await cancelBooking(bookingGuid);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))