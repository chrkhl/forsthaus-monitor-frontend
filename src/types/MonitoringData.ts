import { NightModeInfo } from "./NightModeInfo";
import { PriceData } from "./PriceData";
import { PvRealTimeData } from "./PvRealTimeData";
import { PvSummaryData } from "./PvSummaryData";
import { WeatherCurrentData } from "./WeatherCurrentData";
import { WeatherForecastData } from "./WeatherForecastData";

export interface MonitoringData {
  timestamp: string;
  nightModeInfo: NightModeInfo;
  uncached: string;
  wxCurr: WeatherCurrentData;
  wxToday: WeatherForecastData;
  wxTodayPlus1: WeatherForecastData;
  wxTodayPlus2: WeatherForecastData;
  wxTodayPlus3: WeatherForecastData;
  wxDataCached: boolean;
  pvRealTime: PvRealTimeData;
  pvToday: PvSummaryData;
  pvTodayMinus1: PvSummaryData;
  pvTodayMinus2: PvSummaryData;
  pvMonth: PvSummaryData;
  pvMonthMinus1: PvSummaryData;
  pvMonthMinus2: PvSummaryData;
  energyMarketData: {
    hourlyPrices: Array<PriceData>
  };
}
