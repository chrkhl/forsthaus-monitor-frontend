import { useEffect, useState } from 'react';
import { SettingsPage } from './pages/SettingsPage'
import { MonitorPage } from './pages/MonitorPage'
import { LoginData } from './types/LoginData';
import { loginDataKey, readLoginDataFromStorage } from './readLoginDataFromStorage';

const App = () => {
  const [readyToRender, setReadyToRender] = useState(false);
  const [forceLoginVisible, setForceLoginVisible] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  useEffect(() => {
    const storedLoginData = readLoginDataFromStorage();

    if (storedLoginData) {
      setLoginData(storedLoginData);
    }

    setReadyToRender(true);
  }, []);

  const handleShowLogin = () => {
    setForceLoginVisible(true);
  };

  const handleLogin = (newLoginData: LoginData) => {
    setForceLoginVisible(false);
    setLoginData(newLoginData);
    localStorage.setItem(loginDataKey, JSON.stringify(newLoginData));
  };

  if (!readyToRender) {
    return null;
  }

  const isSettingsPageVisible = !loginData || forceLoginVisible;
  const isMonitorPageVisible = loginData && !forceLoginVisible;

  return (
    <>
      {isSettingsPageVisible && (
        <SettingsPage onLogin={handleLogin} />
      )}
      {isMonitorPageVisible && (
        <MonitorPage loginData={loginData} onShowLogin={handleShowLogin} />
      )}
    </>
  );
}

export default App
