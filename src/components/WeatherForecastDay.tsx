import { WeatherForecastData } from "../types/WeatherForecastData";
import { WeatherCodeIcon } from "./WeatherIcon";
import iconSunshine from "../assets/icons/sunshine.png";
import iconRain from "../assets/icons/rain.png";
import iconTemperature from "../assets/icons/temperature.png";

export const WeatherForecastDay = (props: { weatherForecastData: WeatherForecastData }) => {
  return (
    <div className="weather-forecast-day">
      <div className="day">
        <WeatherCodeIcon wxIcon={props.weatherForecastData.wxIcon} wxDescr={props.weatherForecastData.wxDescr} />
        {props.weatherForecastData.day}
      </div>
      <div className="weather-row">
        <div className="weather-col">
          <img src={iconSunshine} alt="Sunshine" className="icon" />
          {props.weatherForecastData.sunshine} h
        </div>
      </div>
      <div className="weather-row">
        <div className="weather-col">
          <img src={iconTemperature} alt="Temperature" className="icon" />
          {props.weatherForecastData.tempMin}° bis {props.weatherForecastData.tempMax}°
        </div>
      </div>
      <div className="weather-row">
        <div className="weather-col">
          <img src={iconRain} alt="Rain" className="icon" />
          {props.weatherForecastData.precipSum} {props.weatherForecastData.precipProb}
        </div>
      </div>
    </div>
  );
};