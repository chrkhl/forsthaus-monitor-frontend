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
  ["0d", iconWeather0d],
  ["0n", iconWeather0n],
  ["1d", iconWeather1d],
  ["1n", iconWeather1n],
  ["2", iconWeather2],
  ["3", iconWeather3],
  ["45", iconWeather45],
  ["48", iconWeather48],
  ["51", iconWeather51],
  ["53", iconWeather53],
  ["55", iconWeather55],
  ["56", iconWeather56],
  ["57", iconWeather57],
  ["61", iconWeather61],
  ["63", iconWeather63],
  ["65", iconWeather65],
  ["66", iconWeather66],
  ["67", iconWeather67],
  ["71", iconWeather71],
  ["73", iconWeather73],
  ["75", iconWeather75],
  ["77", iconWeather77],
  ["80", iconWeather80],
  ["81", iconWeather81],
  ["82", iconWeather82],
  ["85", iconWeather85],
  ["86", iconWeather86],
  ["95", iconWeather95],
  ["96", iconWeather96],
  ["99", iconWeather99],
]);

export const WeatherCodeIcon = ({ wxCode, isDay }: { wxCode: number, isDay: boolean }) => {
  const wxCodeKey = [0, 1].includes(wxCode) ? `${wxCode}${isDay ? "d" : "n"}` : `${wxCode}`;

  const icon = weatherCodeToIconMap.get(wxCodeKey);

  if (!icon) {
    return null;
  }

  return (
    <img src={icon} alt="Weather" className="icon" />
  );
}