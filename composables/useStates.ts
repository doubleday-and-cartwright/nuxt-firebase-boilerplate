import { User } from "firebase/auth"

export const useCurrentUser = () => useState<User>('currentUser')
export const useUserProfile = () => useState<Object>('userProfile')
export const useUserProfileUnsubscribe = () => useState<Function | null>('userProfileUnsubscribe')