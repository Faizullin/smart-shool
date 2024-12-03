const SESSION_STORAGE_FIELD_NAME = "face_verified";

interface IQuizStorageConstantData {
  for?: any;
  verified?: any;
}
export const QuizStorageConstantKeys: IQuizStorageConstantData = {
  verified: "verified",
  for: "for",
};

export default class QuizSessionService {
  static setSessionData(data: IQuizStorageConstantData): void {
    sessionStorage.setItem(QuizStorageConstantKeys.verified, JSON.stringify(data));
  }
  static getSessionData(
    return_default_empty: boolean = false
  ): QuizStorageConstantKeys | null {
    const storageData = sessionStorage.getItem(SESSION_STORAGE_FIELD_NAME);
    if (storageData) {
      return JSON.parse(storageData);
    }
    if (return_default_empty) {
      return {
        for: "",
        verified: false,
      };
    }
    return null;
  }
  static clean(): void {
    sessionStorage.removeItem(SESSION_STORAGE_FIELD_NAME);
  }
}
