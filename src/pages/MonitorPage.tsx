import { PvRealTime } from '../components/PvRealTime';
import { MonitoringData } from '../types/MonitoringData';
import { useEffect, useState, useCallback } from 'react';
import { WeatherCurrent } from '../components/WeatherCurrent';
import { WeatherForecast } from '../components/WeatherForecast';
import { LoginData } from '../types/LoginData';
import { PvPeriod } from '../components/PvPeriod';
import { EnergyMarketData } from '../components/EnergyMarketData';
import iconSettings from '../assets/icons/settings.png';

// Constants
const BACKEND_PROD = "https://forsthaus-monitor-backend.kuehlchristian.workers.dev/";
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const LOADING_DELAY = 750; // ms

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API base URL depends on environment
// In dev mode, always use Vite proxy (which routes to local or remote based on mode)
// In production, call Render backend directly
const API_BASE_URL = import.meta.env.DEV
  ? '/api'  // Dev: use Vite proxy (target configured in vite.config.ts based on mode)
  : BACKEND_PROD;  // Production: direct call

export const MonitorPage = ({ loginData, onShowLogin }: {
  loginData: LoginData;
  onShowLogin: () => void;
}) => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getMonitoringData = useCallback(async () => {
    setIsRefreshing(true);

    const body = {
      ...loginData,
      withMarketData: true
    };

    try {
      const response = await fetch(`${API_BASE_URL}/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        setMonitoringData(data);

        await wait(LOADING_DELAY);
        setIsRefreshing(false);
      } else {
        // Try to get error details from response
        let errorDetails = `HTTP Status: ${response.status}`;
        try {
          const errorBody = await response.text();
          if (errorBody) {
            errorDetails += ` - ${errorBody}`;
          }
        } catch {
          // Ignore if we can't read the body
        }
        throw new Error(errorDetails);
      }
    } catch (error) {
      console.error("Error fetching monitoring data", error);
      setIsRefreshing(false);
      onShowLogin();
    }
  }, [loginData, onShowLogin]);

  useEffect(() => {
    getMonitoringData();

    const intervalId = setInterval(getMonitoringData, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [getMonitoringData]);

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
      <img
        src={iconSettings}
        alt="settings"
        className="icon settings"
        onClick={onShowLogin}
      />

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

    

      <EnergyMarketData hourlyPrices={monitoringData.energyMarketData?.hourlyPrices} />

      <WeatherCurrent
        wxCurrent={monitoringData.wxCurr}
        wxToday={monitoringData.wxToday}
      />

      <hr />

      <WeatherForecast monitoringData={monitoringData} />
    </article>
  );
};