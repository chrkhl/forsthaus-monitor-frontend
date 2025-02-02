import { useEffect, useState } from 'react';
import { LoginPage } from './pages/LoginPage'
import { MonitorPage } from './pages/MonitorPage'
import { LoginData } from './types/LoginData';

const loginDataKey = "forsthaus-monitor-login-data";

const App = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  useEffect(() => {
    const storedLoginDataRaw = localStorage.getItem(loginDataKey);

    if (!storedLoginDataRaw) {
      return;
    }

    const storedLoginData = JSON.parse(storedLoginDataRaw) as LoginData;

    if (
      !storedLoginData ||
      !storedLoginData?.token ||
      !storedLoginData?.serialNumber ||
      !storedLoginData?.latitude ||
      !storedLoginData?.longitude
    ) {
      return;
    }

    setLoginData(storedLoginData);
  }, []);

  const handleLogin = (newLoginData: LoginData) => {
    setLoginData(newLoginData);
    localStorage.setItem(loginDataKey, JSON.stringify(newLoginData));
  };

  return (
    <>
      { !loginData && <LoginPage onLogin={handleLogin} /> }
      { loginData && <MonitorPage loginData={loginData} /> }
    </>
  )
}

export default App
