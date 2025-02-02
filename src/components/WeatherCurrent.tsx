import iconSunshine from "../assets/icons/sunshine.png";
import iconWind from "../assets/icons/wind.png";
import iconRain from "../assets/icons/rain.png";
import iconSunrise from "../assets/icons/sunrise.png";
import iconSunset from "../assets/icons/sunset.png";
import iconHumidity from "../assets/icons/humidity.png";
import { WeatherForecastData } from "../types/WeatherForecastData";
import { WeatherCurrentData } from "../types/WeatherCurrentData";

export const WeatherCurrent = (props: {wxCurrent: WeatherCurrentData, wxToday: WeatherForecastData}) => {
  return (
    <div className="weather-current">
      <div className="left-panel">
        <span className="temperature">{props.wxCurrent.temp}°</span>
        <div className="weather-row">
          <div className="weather-col">{props.wxToday.tempMin}° bis {props.wxToday.tempMax}°</div>
        </div>
        <div className="weather-row">
          <div className="weather-col">
            <img src={iconSunshine} alt="Sunshine" className="icon" />
            <span>{props.wxToday.sunshine} h</span>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="weather-row">
          <div className="weather-col">
            <img src={iconWind} alt="Wind" className="icon" />
            {props.wxCurrent.windSpeed} ({props.wxCurrent.windDir})
          </div>
        </div>
        <div className="weather-row">
          <div className="weather-col">
            <img src={iconHumidity} alt="Humidity" className="icon" />
            {props.wxCurrent.humidity}
          </div>
          <div className="weather-col">
            <img src={iconRain} alt="Rain" className="icon" />
            {props.wxToday.precipSum} {props.wxToday.precipProb}
          </div>
        </div>
        <div className="weather-row">
          <div className="weather-col">
            <img src={iconSunrise} alt="Sunrise" className="icon" />
            {props.wxCurrent.sunrise} Uhr
          </div>
          <div className="weather-col">
            <img src={iconSunset} alt="Sunset" className="icon" />
            {props.wxCurrent.sunset} Uhr
          </div>
        </div>
      </div>
    </div>
  );
};
