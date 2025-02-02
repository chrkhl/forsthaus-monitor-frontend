import { PvRealTime } from '../components/PvRealTime';
import { MonitoringData } from '../types/MonitoringData';
import { useEffect, useState } from 'react';
import { WeatherCurrent } from '../components/WeatherCurrent';
import { WeatherForecast } from '../components/WeatherForecast';
import { LoginData } from '../types/LoginData';

export const MonitorPage = (props: {loginData: LoginData}) => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);

  useEffect(() => {
    const body = props.loginData;

    fetch("https://forsthaus-monitor-backend.onrender.com/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setMonitoringData(data);
      }
    });
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
      <PvRealTime
        wxCode={0}
        isDay={true}
        pvRealTimeData={monitoringData.pvRealTime}
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
        <div className="period">
          <span className="label">{monitoringData.pvTodayMinus2.label}</span>
          <span className="value">{monitoringData.pvTodayMinus2.sumGeneration}</span>
        </div>
        <div className="period">
          <span className="label">{monitoringData.pvTodayMinus1.label}</span>
          <span className="value">{monitoringData.pvTodayMinus1.sumGeneration}</span>
        </div>
        <div className="period">
          <span className="label">{monitoringData.pvToday.label}</span>
          <span className="value">{monitoringData.pvToday.sumGeneration}</span>
        </div>
      </div>

      <div className="pv-production-periods">
        <div className="period">
          <span className="label">{monitoringData.pvMonthMinus2.label}</span>
          <span className="value">{monitoringData.pvMonthMinus2.sumGeneration}</span>
        </div>
        <div className="period">
          <span className="label">{monitoringData.pvMonthMinus1.label}</span>
          <span className="value">{monitoringData.pvMonthMinus1.sumGeneration}</span>
        </div>
        <div className="period">
          <span className="label">{monitoringData.pvMonth.label}</span>
          <span className="value">{monitoringData.pvMonth.sumGeneration}</span>
        </div>
      </div>

      <hr />

      <WeatherCurrent wxCurrent={monitoringData.wxCurr} wxToday={monitoringData.wxToday} />

      <hr />

      <WeatherForecast monitoringData={monitoringData} />
    </article>
  );
};