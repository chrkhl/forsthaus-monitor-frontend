import { useEffect, useState } from 'react';
import { LoginPage } from './pages/LoginPage'
import { MonitorPage } from './pages/MonitorPage'
import { LoginData } from './types/LoginData';

const loginDataKey = "forsthaus-monitor-login-data";

const App = () => {
  const [readyToRender, setReadyToRender] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  useEffect(() => {
    const storedLoginDataRaw = localStorage.getItem(loginDataKey);

    if (!storedLoginDataRaw) {
      setReadyToRender(true);
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
      setReadyToRender(true);
      return;
    }

    setLoginData(storedLoginData);
    setReadyToRender(true);
  }, []);

  const handleLogin = (newLoginData: LoginData) => {
    setLoginData(newLoginData);
    localStorage.setItem(loginDataKey, JSON.stringify(newLoginData));
  };

  if (!readyToRender) {
    return null;
  }

  return (
    <>
      { !loginData && <LoginPage onLogin={handleLogin} /> }
      { loginData && <MonitorPage loginData={loginData} /> }
    </>
  )
}

export default App
