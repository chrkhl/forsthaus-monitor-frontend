import { LoginData } from "./types/LoginData";

export const loginDataKey = "forsthaus-monitor-login-data";

export const readLoginDataFromStorage = () : LoginData | null => {
  try {
    const storedLoginDataRaw = localStorage.getItem(loginDataKey);

    if (!storedLoginDataRaw) {
      return null;
    }

    
    const storedLoginData = JSON.parse(storedLoginDataRaw) as LoginData;

    if (
      !storedLoginData ||
      !storedLoginData?.token ||
      !storedLoginData?.serialNumber ||
      !storedLoginData?.latitude ||
      !storedLoginData?.longitude
    ) {
      return null;
    }

    return storedLoginData;
  } catch (error) {
    return null;
  }
};