import iconBattery0 from "../assets/icons/battery-0.png";
import iconBattery25 from "../assets/icons/battery-25.png";
import iconBattery50 from "../assets/icons/battery-50.png";
import iconBattery75 from "../assets/icons/battery-75.png";
import iconBattery100 from "../assets/icons/battery-100.png";
import iconBattery0Charging from "../assets/icons/battery-0-charging.png";
import iconBattery25Charging from "../assets/icons/battery-25-charging.png";
import iconBattery50Charging from "../assets/icons/battery-50-charging.png";
import iconBattery75Charging from "../assets/icons/battery-75-charging.png";
import iconBattery100Charging from "../assets/icons/battery-100-charging.png";
import iconBattery0Uncharing from "../assets/icons/battery-0-uncharging.png";
import iconBattery25Uncharing from "../assets/icons/battery-25-uncharging.png";
import iconBattery50Uncharing from "../assets/icons/battery-50-uncharging.png";
import iconBattery75Uncharing from "../assets/icons/battery-75-uncharging.png";
import iconBattery100Uncharing from "../assets/icons/battery-100-uncharging.png";

const batteryIconMap = new Map<string, string>([
  ["battery_0", iconBattery0],
  ["battery_25", iconBattery25],
  ["battery_50", iconBattery50],
  ["battery_75", iconBattery75],
  ["battery_100", iconBattery100],
  ["battery_0_charging", iconBattery0Charging],
  ["battery_25_charging", iconBattery25Charging],
  ["battery_50_charging", iconBattery50Charging],
  ["battery_75_charging", iconBattery75Charging],
  ["battery_100_charging", iconBattery100Charging],
  ["battery_0_uncharging", iconBattery0Uncharing],
  ["battery_25_uncharging", iconBattery25Uncharing],
  ["battery_50_uncharging", iconBattery50Uncharing],
  ["battery_75_uncharging", iconBattery75Uncharing],
  ["battery_100_uncharging", iconBattery100Uncharing]
]);


export const BatteryIcon = ({ iconIdentifier } : { iconIdentifier: string }) => {
  const iconUrl = batteryIconMap.get(iconIdentifier);

  if (!iconUrl) {
    return null;
  }

  return (
    <img src={iconUrl} alt="Battery Icon" className="icon " />
  );
};