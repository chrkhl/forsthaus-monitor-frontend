import { MonitoringData } from "../types/MonitoringData";
import { WeatherForecastDay } from "./WeatherForecastDay";

export const WeatherForecast = (props: { monitoringData: MonitoringData}) => (
  <div className="weather-forecast">
    <WeatherForecastDay weatherForecastData={props.monitoringData.wxTodayPlus1} />
    <WeatherForecastDay weatherForecastData={props.monitoringData.wxTodayPlus2} />
    <WeatherForecastDay weatherForecastData={props.monitoringData.wxTodayPlus3} />
  </div>
);