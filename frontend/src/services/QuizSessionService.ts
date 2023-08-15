const SESSION_STORAGE_FIELD_NAME = 'face_verified'

export interface ISessionData {
    for: string
    verified: boolean
}

export default class QuizSessionService {
    static setSessionData(data: ISessionData): void {
        sessionStorage.setItem(SESSION_STORAGE_FIELD_NAME, JSON.stringify(data))
    }
    static getSessionData(return_default_empty: boolean = false): ISessionData | null {
        const storageData = sessionStorage.getItem(SESSION_STORAGE_FIELD_NAME)
        if (storageData) {
            return JSON.parse(storageData)
        }
        if (return_default_empty) {
            return {
                for: '',
                verified: false
            }
        }
        return null
    }
    static clearSessionData(): void {
        sessionStorage.removeItem(SESSION_STORAGE_FIELD_NAME)
    }
}