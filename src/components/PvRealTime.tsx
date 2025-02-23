import iconSolarPanel from "../assets/icons/solar-panel.png";
import iconHouse from "../assets/icons/house.png";
import iconPowerGridBuy from "../assets/icons/power-grid-buy.png";
import iconPowerGridIdle from "../assets/icons/power-grid-idle.png";
import iconPowerGridSell from "../assets/icons/power-grid-sell.png";

import { PvRealTimeData, PowerGridMode } from "../types/PvRealTimeData";
import { WeatherCodeIcon } from "./WeatherIcon";
import { BatteryIcon } from "./BatteryIcon";

interface PvRealTimeProps {
  wxIcon: string;
  wxDescr: string;
  pvRealTimeData: PvRealTimeData;
  isRefreshing: boolean;
  onRefreshData: () => void;
}

const IconPowerGrid = (props: { gridMode: PowerGridMode}) => {
  if (props.gridMode === "buy") {
    return <img src={iconPowerGridBuy} alt="Power Grid Buy" className="icon" />;
  }

  if (props.gridMode === "sell") {
    return <img src={iconPowerGridSell} alt="Power Grid Sell" className="icon" />;
  }

  return <img src={iconPowerGridIdle} alt="Power Grid Buy" className="icon" />;
}

const getGridValue = (data: PvRealTimeData) => {
  if (data.gridMode === "buy") {
    return `+${data.gridPow}`;
  }

  if (data.gridMode === "sell") {
    return `-${data.gridPow}`;
  }

  return "0,00 kW";
};

export const PvRealTime = (props: PvRealTimeProps) => {
  return (
    <>
      {props.isRefreshing && (
        <div className="icon-weather-current is-refreshing">
          <WeatherCodeIcon wxIcon="weather_0_d" wxDescr={props.wxDescr} />
        </div>
      )}
      {!props.isRefreshing && (
        <div className="icon-weather-current">
          <WeatherCodeIcon
            wxIcon={props.wxIcon}
            wxDescr={props.wxDescr}
            onClick={props.onRefreshData}
          />
        </div>
      )}
      <div className="current-status">
        <div className="status status-battery">
          <BatteryIcon iconIdentifier={props.pvRealTimeData.batIcon} />
          <span className="value">{props.pvRealTimeData.batSoC}</span>
          <span className="value">{props.pvRealTimeData.batPower}</span>
        </div>
        <div className="status status-solar">
          <img src={iconSolarPanel} alt="Solar Panel" className="icon" />
          <span className="value">{props.pvRealTimeData.pwPowEfficiency}</span>
          <span className="value">+{props.pvRealTimeData.pvPow}</span>
        </div>
        <div className="status status-house">
          <img src={iconHouse} alt="House" className="icon" />
          <span className="value">{props.pvRealTimeData.selfProdPowShare}</span>
          <span className="value">-{props.pvRealTimeData.loadsPow}</span>
        </div>
        <div className="status status-grid">
          <IconPowerGrid gridMode={props.pvRealTimeData.gridMode} />
          <span className="value">
            {props.pvRealTimeData.gridPowPercentage}
          </span>
          <span className="value">{getGridValue(props.pvRealTimeData)}</span>
        </div>
      </div>
    </>
  );
};
