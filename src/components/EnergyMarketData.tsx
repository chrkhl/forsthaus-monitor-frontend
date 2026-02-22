import { useState } from "react";
import { PriceData } from "../types/PriceData";

interface PriceStats {
  current: { price: string; time: string } | null;
  min: { price: string; time: string } | null;
  max: { price: string; time: string } | null;
  cheapHours: string | null;
  expensiveHours: string | null;
  trend: string | null;
}

const calculatePriceStats = (hourlyPrices: Array<PriceData>): PriceStats => {
  if (!hourlyPrices?.length) {
    return { current: null, min: null, max: null, cheapHours: null, expensiveHours: null, trend: null };
  }

  // Get current hour (0-23)
  const currentHour = new Date().getHours();

  // Find current price and index
  let currentIndex = -1;
  const currentPrice = hourlyPrices.find((item, index) => {
    const timeMatch = item.time.match(/^(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1], 10);
      if (hour === currentHour) {
        currentIndex = index;
        return true;
      }
    }
    return false;
  });

  // Calculate trend for next 3 hours
  let trend: string | null = null;
  if (currentPrice && currentIndex >= 0 && currentIndex < hourlyPrices.length - 1) {
    const next3Hours = hourlyPrices.slice(currentIndex + 1, currentIndex + 4);
    if (next3Hours.length > 0) {
      const currentPriceValue = parseFloat(currentPrice.pricePerKWh);
      const avgNextPrice = next3Hours.reduce((sum, item) => sum + parseFloat(item.pricePerKWh), 0) / next3Hours.length;
      const priceDiff = avgNextPrice - currentPriceValue;
      const absDiff = Math.abs(priceDiff);

      if (absDiff < 0.3) {
        trend = "➡ stabil";
      } else if (priceDiff < 0) {
        // Falling prices
        const arrow = absDiff >= 5.0 ? "⬇⬇" : "⬇";
        trend = `${arrow} ${priceDiff.toFixed(1)} ct`;
      } else {
        // Rising prices
        const arrow = absDiff >= 5.0 ? "⬆⬆" : "⬆";
        trend = `${arrow} +${priceDiff.toFixed(1)} ct`;
      }
    }
  }

  // Find min and max prices using priceCategory
  let minPrice = hourlyPrices[0];
  let maxPrice = hourlyPrices[0];

  hourlyPrices.forEach((item) => {
    if (item.priceCategory < minPrice.priceCategory) {
      minPrice = item;
    }
    if (item.priceCategory > maxPrice.priceCategory) {
      maxPrice = item;
    }
  });

  // Find longest sequence of cheap hours (priceCategory 1-3)
  type Range = { start: number; end: number; length: number };
  let longestCheap: Range | null = null;
  let currentCheap: { start: number; length: number } | null = null;

  hourlyPrices.forEach((item, index) => {
    if (item.priceCategory >= 1 && item.priceCategory <= 3) {
      if (currentCheap === null) {
        currentCheap = { start: index, length: 1 };
      } else {
        currentCheap.length++;
      }

      const currentLength = currentCheap.length;
      const currentStart = currentCheap.start;

      if (longestCheap === null || currentLength > longestCheap.length) {
        longestCheap = {
          start: currentStart,
          end: index,
          length: currentLength,
        };
      }
    } else {
      currentCheap = null;
    }
  });

  // Find longest sequence of expensive hours (priceCategory 8-10)
  let longestExpensive: Range | null = null;
  let currentExpensive: { start: number; length: number } | null = null;

  hourlyPrices.forEach((item, index) => {
    if (item.priceCategory >= 8 && item.priceCategory <= 10) {
      if (currentExpensive === null) {
        currentExpensive = { start: index, length: 1 };
      } else {
        currentExpensive.length++;
      }

      const currentLength = currentExpensive.length;
      const currentStart = currentExpensive.start;

      if (longestExpensive === null || currentLength > longestExpensive.length) {
        longestExpensive = {
          start: currentStart,
          end: index,
          length: currentLength,
        };
      }
    } else {
      currentExpensive = null;
    }
  });

  // Extract time ranges
  const extractTimeRange = (startIndex: number, endIndex: number): string => {
    const startTime = hourlyPrices[startIndex].time.match(/^(\d{1,2}:\d{2})/)?.[1] || "";
    const endTimeMatch = hourlyPrices[endIndex].time.match(/-\s*(\d{1,2}:\d{2})/);
    const endTime = endTimeMatch?.[1] || "";
    return `${startTime} - ${endTime}`;
  };

  // Calculate time ranges with explicit null checks
  let cheapHoursRange: string | null = null;
  if (longestCheap) {
    const range = longestCheap as Range;
    cheapHoursRange = extractTimeRange(range.start, range.end);
  }

  let expensiveHoursRange: string | null = null;
  if (longestExpensive) {
    const range = longestExpensive as Range;
    expensiveHoursRange = extractTimeRange(range.start, range.end);
  }

  return {
    current: currentPrice
      ? { price: currentPrice.pricePerKWh, time: currentPrice.time }
      : null,
    min: { price: minPrice.pricePerKWh, time: minPrice.time.split(" - ")[0] || "" },
    max: { price: maxPrice.pricePerKWh, time: maxPrice.time.split(" - ")[0] || "" },
    cheapHours: cheapHoursRange,
    expensiveHours: expensiveHoursRange,
    trend,
  };
};

export const EnergyMarketData = ({
  hourlyPrices,
}: {
  hourlyPrices: Array<PriceData>
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!hourlyPrices?.length) {
    return null;
  }

  const stats = calculatePriceStats(hourlyPrices);

  return (
    <>
      <div
        className="energy-market-data"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        {hourlyPrices.map((item, index) => (
          <div
            key={`${index}-${item.priceCategory}`}
            className={`price-category price-category-${item.priceCategory}`}
            title={`${item.time}: ${item.pricePerKWh}`}
          />
        ))}
      </div>

      {isExpanded && (
        <div className="energy-price-details">
          <div className="price-periods">
            <div className="period">
              <span className="label">Minimum</span>
              <span className="value">{stats.min?.price || "-"}</span>
            </div>
            <div className="period">
              <span className="label">Maximum</span>
              <span className="value">{stats.max?.price || "-"}</span>
            </div>
            <div className="period">
              <span className="label">Aktuell</span>
              <span className="value">{stats.current?.price || "-"}</span>
            </div>
          </div>

          {(stats.cheapHours || stats.expensiveHours || stats.trend) && (
            <div className="price-periods">
              {stats.cheapHours && (
                <div className="period">
                  <span className="label">Günstig</span>
                  <span className="value">{stats.cheapHours}</span>
                </div>
              )}
              {stats.expensiveHours && (
                <div className="period">
                  <span className="label">Teuer</span>
                  <span className="value">{stats.expensiveHours}</span>
                </div>
              )}
              {stats.trend && (
                <div className="period">
                  <span className="label">Tendenz</span>
                  <span className="value">{stats.trend}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <hr />
    </>
  );
};
