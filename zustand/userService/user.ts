import { UserInformationForm } from "../types"
import { userInforformDataJson } from "../../config/constant/auth"
import { create } from "zustand"

interface UserState {
    userInformation: UserInformationForm
}

export const useUserService = create<UserState>()((set) => ({
    userInformation: userInforformDataJson
}))

export const useUser = () => useUserService((state) => state.userInformation)