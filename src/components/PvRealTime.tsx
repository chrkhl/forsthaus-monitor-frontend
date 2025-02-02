import iconSolarPanel from "../assets/icons/solar-panel.png";
import iconHouse from "../assets/icons/house.png";
import iconPowerGrid from "../assets/icons/power-grid.png";

import { PvRealTimeData } from "../types/PvRealTimeData";
import { WeatherCodeIcon } from "./WeatherIcon";
import { BatteryIcon } from "./BatteryIcon";

interface PvRealTimeProps {
  wxCode: number;
  isDay: boolean;
  pvRealTimeData: PvRealTimeData;
}

export const PvRealTime = (props: PvRealTimeProps) => {
  return (
    <>
      <div className="icon-weather-current">
        <WeatherCodeIcon wxCode={props.wxCode} isDay={props.isDay} />
      </div>
      <div className="current-status">
        <div className="status status-battery">
          <BatteryIcon iconIdentifier={props.pvRealTimeData.batIcon} />
          <span className="value">{props.pvRealTimeData.batSoC}</span>
          <span className="value">{props.pvRealTimeData.batPower}</span>
        </div>
        <div className="status status-solar">
          <img src={iconSolarPanel} alt="Solar Panel" className="icon" />
          <span className="value">{props.pvRealTimeData.pwPowEfficiency}</span>
          <span className="value">{props.pvRealTimeData.pvPow}</span>
        </div>
        <div className="status status-house">
          <img src={iconHouse} alt="House" className="icon" />
          <span className="value">{props.pvRealTimeData.selfProdPowShare}</span>
          <span className="value">{props.pvRealTimeData.loadsPow}</span>
        </div>
        <div className="status status-grid">
          <img src={iconPowerGrid} alt="Power Grid" className="icon" />
          <span className="value">{props.pvRealTimeData.gridPowPercentage}</span>
          <span className="value">{props.pvRealTimeData.gridPow}</span>
        </div>
      </div>
    </>
  );
};
