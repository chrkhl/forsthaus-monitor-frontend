import iconWeather0d from "../assets/icons/weather-0-d.png";
import iconWeather0n from "../assets/icons/weather-0-n.png";
import iconWeather1d from "../assets/icons/weather-1-d.png";
import iconWeather1n from "../assets/icons/weather-1-n.png";
import iconWeather2 from "../assets/icons/weather-2.png";
import iconWeather3 from "../assets/icons/weather-3.png";
import iconWeather45 from "../assets/icons/weather-45.png";
import iconWeather48 from "../assets/icons/weather-48.png";
import iconWeather51 from "../assets/icons/weather-51.png";
import iconWeather53 from "../assets/icons/weather-53.png";
import iconWeather55 from "../assets/icons/weather-55.png";
import iconWeather56 from "../assets/icons/weather-56.png";
import iconWeather57 from "../assets/icons/weather-57.png";
import iconWeather61 from "../assets/icons/weather-61.png";
import iconWeather63 from "../assets/icons/weather-63.png";
import iconWeather65 from "../assets/icons/weather-65.png";
import iconWeather66 from "../assets/icons/weather-66.png";
import iconWeather67 from "../assets/icons/weather-67.png";
import iconWeather71 from "../assets/icons/weather-71.png";
import iconWeather73 from "../assets/icons/weather-73.png";
import iconWeather75 from "../assets/icons/weather-75.png";
import iconWeather77 from "../assets/icons/weather-77.png";
import iconWeather80 from "../assets/icons/weather-80.png";
import iconWeather81 from "../assets/icons/weather-81.png";
import iconWeather82 from "../assets/icons/weather-82.png";
import iconWeather85 from "../assets/icons/weather-85.png";
import iconWeather86 from "../assets/icons/weather-86.png";
import iconWeather95 from "../assets/icons/weather-95.png";
import iconWeather96 from "../assets/icons/weather-96.png";
import iconWeather99 from "../assets/icons/weather-99.png";

const weatherCodeToIconMap = new Map<string, string>([
  ["weather_0_d", iconWeather0d],
  ["weather_0_n", iconWeather0n],
  ["weather_1_d", iconWeather1d],
  ["weather_1_n", iconWeather1n],
  ["weather_2", iconWeather2],
  ["weather_3", iconWeather3],
  ["weather_45", iconWeather45],
  ["weather_48", iconWeather48],
  ["weather_51", iconWeather51],
  ["weather_53", iconWeather53],
  ["weather_55", iconWeather55],
  ["weather_56", iconWeather56],
  ["weather_57", iconWeather57],
  ["weather_61", iconWeather61],
  ["weather_63", iconWeather63],
  ["weather_65", iconWeather65],
  ["weather_66", iconWeather66],
  ["weather_67", iconWeather67],
  ["weather_71", iconWeather71],
  ["weather_73", iconWeather73],
  ["weather_75", iconWeather75],
  ["weather_77", iconWeather77],
  ["weather_80", iconWeather80],
  ["weather_81", iconWeather81],
  ["weather_82", iconWeather82],
  ["weather_85", iconWeather85],
  ["weather_86", iconWeather86],
  ["weather_95", iconWeather95],
  ["weather_96", iconWeather96],
  ["weather_99", iconWeather99]
]);

export const WeatherCodeIcon = ({ wxIcon, wxDescr }: { wxIcon: string, wxDescr: string }) => {
  const icon = weatherCodeToIconMap.get(wxIcon);

  if (!icon) {
    return null;
  }

  return (
    <img src={icon} alt={wxDescr} title={wxDescr} className={`icon ${wxIcon}`} />
  );
}