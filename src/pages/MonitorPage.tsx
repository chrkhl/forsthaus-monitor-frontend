import iconBattery100Uncharging from '../assets/icons/battery-100-uncharging.png';
import iconSolarPanel from '../assets/icons/solar-panel.png';
import iconHouse from '../assets/icons/house.png';
import iconPowerGrid from '../assets/icons/power-grid.png';
import iconSunshine from '../assets/icons/sunshine.png';
import iconWind from "../assets/icons/wind.png";
import iconRain from "../assets/icons/rain.png";
import iconSunrise from "../assets/icons/sunrise.png";
import iconSunset from "../assets/icons/sunset.png";
import iconTemperature from "../assets/icons/temperature.png";
import { WeatherCodeIcon } from '../components/WeatherIcon';

export const MonitorPage = () => {
  return (
    <article>
      <div className="icon-weather-current">
        <WeatherCodeIcon wxCode={0} isDay={false} />
      </div>
      <div className="current-status">
        <div className="status status-battery">
          <img src={iconBattery100Uncharging} alt="Battery" className="icon" />
          <span className="value">100%</span>
          <span className="value">+3,45 kW</span>
        </div>
        <div className="status status-solar">
          <img src={iconSolarPanel} alt="Solar Panel" className="icon" />
          <span className="value">100%</span>
          <span className="value">+3,45 kW</span>
        </div>
        <div className="status status-house">
          <img src={iconHouse} alt="House" className="icon" />
          <span className="value">100%</span>
          <span className="value">+3,45 kW</span>
        </div>
        <div className="status status-grid">
          <img src={iconPowerGrid} alt="Power Grid" className="icon" />
          <span className="value">100%</span>
          <span className="value">+3,45 kW</span>
        </div>
      </div>

      <hr />

      <div className="pv-production-cumulative">
        <span className="value">5.409 kWh</span>
        <div className="notes">
          <span>seit 07. Januar 2025</span>
          <span>Stand: 19.01.25 17:35, 3.79 V</span>
        </div>
      </div>

      <hr />

      <div className="pv-production-periods">
        <div className="period">
          <span className="label">Vorgestern</span>
          <span className="value">3,45 kWh</span>
        </div>
        <div className="period">
          <span className="label">Gestern</span>
          <span className="value">6,45 kWh</span>
        </div>
        <div className="period">
          <span className="label">Heute</span>
          <span className="value">8,87 kWh</span>
        </div>
      </div>

      <div className="pv-production-periods">
        <div className="period">
          <span className="label">12/2024</span>
          <span className="value">23,30 kWh</span>
        </div>
        <div className="period">
          <span className="label">01/2025</span>
          <span className="value">38,42 kWh</span>
        </div>
        <div className="period">
          <span className="label">02/2025</span>
          <span className="value">18,37 kWh</span>
        </div>
      </div>

      <hr />

      <div className="weather-current">
        <div className="left-panel">
          <span className="temperature">17,4°</span>
          <div className="weather-row">
            <div className="weather-col">7° bis 18°</div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconSunshine} alt="Sunshine" className="icon" />
              <span>07:20h</span>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconWind} alt="Wind" className="icon" />
              3,6 km/h (SSO)
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconSunshine} alt="Sunshine" className="icon" />
              07:45h
            </div>
            <div className="weather-col">
              <img src={iconRain} alt="Rain" className="icon" />
              14mm 65%
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconSunrise} alt="Sunrise" className="icon" />
              06:42
            </div>
            <div className="weather-col">
              <img src={iconSunset} alt="Sunset" className="icon" />
              19:35
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="weather-forecast">
        <div className="weather-forecast-day">
          <div className="day">
            <WeatherCodeIcon wxCode={0} isDay={true} />
            Mittwoch
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconSunshine} alt="Sunshine" className="icon" />
              07:20h
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconTemperature} alt="Temperature" className="icon" />
              4° bis 15°
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconRain} alt="Rain" className="icon" />
              7mm 45%
            </div>
          </div>
        </div>

        <div className="weather-forecast-day">
          <div className="day">
            <WeatherCodeIcon wxCode={0} isDay={true} />
            Mittwoch
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconSunshine} alt="Sunshine" className="icon" />
              07:20h
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconTemperature} alt="Temperature" className="icon" />
              4° bis 15°
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconRain} alt="Rain" className="icon" />
              7mm 45%
            </div>
          </div>
        </div>

        <div className="weather-forecast-day">
          <div className="day">
            <WeatherCodeIcon wxCode={0} isDay={true} />
            Mittwoch
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconSunshine} alt="Sunshine" className="icon" />
              07:20h
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconTemperature} alt="Temperature" className="icon" />
              4° bis 15°
            </div>
          </div>
          <div className="weather-row">
            <div className="weather-col">
              <img src={iconRain} alt="Rain" className="icon" />
              7mm 45%
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};