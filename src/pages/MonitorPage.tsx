import { PvRealTime } from '../components/PvRealTime';
import { MonitoringData } from '../types/MonitoringData';
import { useEffect, useState } from 'react';
import { WeatherCurrent } from '../components/WeatherCurrent';
import { WeatherForecast } from '../components/WeatherForecast';
import { LoginData } from '../types/LoginData';
import { PvPeriod } from '../components/PvPeriod';
import iconSettings from '../assets/icons/settings.png';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MonitorPage = (props: {loginData: LoginData, onShowLogin: () => void}) => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getMonitoringData = async () => {
    setIsRefreshing(true);

    const body = props.loginData;

    try {
      const response = await fetch("https://forsthaus-monitor-backend.onrender.com/data", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        setMonitoringData(data);

        await wait(750);
        setIsRefreshing(false);
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching monitoring data", error);
      setIsRefreshing(false);
      props.onShowLogin();
    }
  };

  useEffect(() => {
    getMonitoringData();

    const intervalId = setInterval(getMonitoringData, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const bodyElement = document.querySelector("body");

    if (!bodyElement || !monitoringData) {
      return;
    }

    if (monitoringData.nightModeInfo.isInNightMode) {
      bodyElement.classList.add("night-mode");
    } else {
      bodyElement.classList.remove("night-mode");
    }
  }, [monitoringData]);

  if (!monitoringData) {
    return null;
  }

  return (
    <article>
      <img src={iconSettings} alt="settings" className="icon settings" onClick={props.onShowLogin} />

      <PvRealTime
        wxIcon={monitoringData.wxCurr.wxIcon}
        wxDescr={monitoringData.wxCurr.wxDescr}
        pvRealTimeData={monitoringData.pvRealTime}
        isRefreshing={isRefreshing}
        onRefreshData={getMonitoringData}
      />

      <hr />

      <div className="pv-production-cumulative">
        <span className="value">{monitoringData.pvRealTime.cumulative}</span>
        <div className="notes">
          <span>seit 07. Januar 2025</span>
          <span>Stand: {monitoringData.timestamp}</span>
        </div>
      </div>

      <hr />

      <div className="pv-production-periods">
        <PvPeriod data={monitoringData.pvTodayMinus2} />
        <PvPeriod data={monitoringData.pvTodayMinus1} />
        <PvPeriod data={monitoringData.pvToday} />
      </div>

      <div className="pv-production-periods">
        <PvPeriod data={monitoringData.pvMonthMinus2} />
        <PvPeriod data={monitoringData.pvMonthMinus1} />
        <PvPeriod data={monitoringData.pvMonth} />
      </div>

      <hr />

      <WeatherCurrent
        wxCurrent={monitoringData.wxCurr}
        wxToday={monitoringData.wxToday}
      />

      <hr />

      <WeatherForecast monitoringData={monitoringData} />
    </article>
  );
};