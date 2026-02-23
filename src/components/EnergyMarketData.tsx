import { useState } from "react";
import { PriceData } from "../types/PriceData";

// Constants
const PRICE_THRESHOLD = 10.0; // ct/kWh
const TREND_STABLE_THRESHOLD = 0.3;
const TREND_DOUBLE_ARROW_THRESHOLD = 5.0;
const CHEAP_CATEGORY_MIN = 1;
const CHEAP_CATEGORY_MAX = 3;
const EXPENSIVE_CATEGORY_MIN = 8;
const EXPENSIVE_CATEGORY_MAX = 10;
const ANIMATION_DURATION = 250; // ms
const ANIMATION_DELAY = 10; // ms

interface PriceStats {
  current: { price: string; time: string } | null;
  min: { price: string; time: string } | null;
  max: { price: string; time: string } | null;
  cheapHours: string | null;
  expensiveHours: string | null;
  trend: string | null;
  avgDiff: string | null;
}

// Helper function to parse German price format
const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(',', '.'));
};

// Helper function to find longest sequence in array
const findLongestSequence = (
  items: PriceData[],
  predicate: (category: number) => boolean
): { start: number; end: number } | null => {
  let longest: { start: number; end: number; length: number } | null = null;
  let current: { start: number; length: number } | null = null;

  items.forEach((item, index) => {
    if (predicate(item.priceCategory)) {
      if (!current) {
        current = { start: index, length: 1 };
      } else {
        current.length++;
      }

      if (!longest || current.length > longest.length) {
        longest = { start: current.start, end: index, length: current.length };
      }
    } else {
      current = null;
    }
  });

  return longest ? { start: longest.start, end: longest.end } : null;
};

// Helper function to extract time range
const extractTimeRange = (
  hourlyPrices: PriceData[],
  startIndex: number,
  endIndex: number
): string => {
  const startTime = hourlyPrices[startIndex].time.match(/^(\d{1,2}:\d{2})/)?.[1] || "";
  const endTime = hourlyPrices[endIndex].time.match(/-\s*(\d{1,2}:\d{2})/)?.[1] || "";
  return `${startTime} - ${endTime}`;
};

const calculatePriceStats = (hourlyPrices: PriceData[]): PriceStats => {
  if (!hourlyPrices?.length) {
    return { current: null, min: null, max: null, cheapHours: null, expensiveHours: null, trend: null, avgDiff: null };
  }

  const currentHour = new Date().getHours();

  // Single pass: find current price, min/max, and calculate average
  let currentIndex = -1;
  let currentPrice: PriceData | null = null;
  let minPrice = hourlyPrices[0];
  let maxPrice = hourlyPrices[0];
  let minPriceValue = parsePrice(hourlyPrices[0].pricePerKWh);
  let maxPriceValue = minPriceValue;
  let priceSum = 0;

  hourlyPrices.forEach((item, index) => {
    const price = parsePrice(item.pricePerKWh);
    priceSum += price;

    // Check if this is current hour
    if (currentIndex === -1) {
      const timeMatch = item.time.match(/^(\d{1,2}):(\d{2})/);
      if (timeMatch && parseInt(timeMatch[1], 10) === currentHour) {
        currentIndex = index;
        currentPrice = item;
      }
    }

    // Update min/max
    if (price < minPriceValue) {
      minPrice = item;
      minPriceValue = price;
    }
    if (price > maxPriceValue) {
      maxPrice = item;
      maxPriceValue = price;
    }
  });

  const avgPrice = priceSum / hourlyPrices.length;

  // Calculate trend for next 4 hours
  let trend: string | null = null;
  if (currentPrice && currentIndex >= 0 && currentIndex < hourlyPrices.length - 1) {
    const next4Hours = hourlyPrices.slice(currentIndex + 1, currentIndex + 5);
    if (next4Hours.length > 0) {
      const currentPriceValue = parsePrice(currentPrice.pricePerKWh);
      const avgNextPrice = next4Hours.reduce((sum, item) => sum + parsePrice(item.pricePerKWh), 0) / next4Hours.length;
      const priceDiff = avgNextPrice - currentPriceValue;
      const absDiff = Math.abs(priceDiff);

      if (absDiff < TREND_STABLE_THRESHOLD) {
        trend = "➡ stabil";
      } else {
        const arrow = absDiff >= TREND_DOUBLE_ARROW_THRESHOLD
          ? (priceDiff < 0 ? "&#9660;&#9660;" : "&#9650;&#9650;")
          : (priceDiff < 0 ? "&#9660;" : "&#9650;");
        const sign = priceDiff < 0 ? "" : "+";
        trend = `${arrow} ${sign}${priceDiff.toFixed(1)} ct`;
      }
    }
  }

  // Find longest cheap and expensive periods
  const longestCheap = findLongestSequence(hourlyPrices, (cat) => cat >= CHEAP_CATEGORY_MIN && cat <= CHEAP_CATEGORY_MAX);
  const longestExpensive = findLongestSequence(hourlyPrices, (cat) => cat >= EXPENSIVE_CATEGORY_MIN && cat <= EXPENSIVE_CATEGORY_MAX);

  // Calculate average difference
  let avgDiff: string | null = null;
  if (currentPrice) {
    const diff = parsePrice(currentPrice.pricePerKWh) - avgPrice;
    avgDiff = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} ct`;
  }

  return {
    current: currentPrice
      ? { price: currentPrice.pricePerKWh, time: currentPrice.time }
      : null,
    min: { price: minPrice.pricePerKWh, time: minPrice.time.split(" - ")[0] || "" },
    max: { price: maxPrice.pricePerKWh, time: maxPrice.time.split(" - ")[0] || "" },
    cheapHours: longestCheap ? extractTimeRange(hourlyPrices, longestCheap.start, longestCheap.end) : null,
    expensiveHours: longestExpensive ? extractTimeRange(hourlyPrices, longestExpensive.start, longestExpensive.end) : null,
    trend,
    avgDiff,
  };
};

export const EnergyMarketData = ({
  hourlyPrices,
}: {
  hourlyPrices: PriceData[]
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationState, setAnimationState] = useState<'collapsed' | 'expanding' | 'collapsing'>('collapsed');

  const handleToggle = () => {
    if (isExpanded) {
      // Schließen: Erst collapsing-Animation starten
      setAnimationState('collapsing');
      // Nach ANIMATION_DURATION: State auf collapsed setzen
      setTimeout(() => {
        setIsExpanded(false);
        setAnimationState('collapsed');
      }, ANIMATION_DURATION);
    } else {
      // Öffnen: State sofort setzen, dann Animation starten
      setIsExpanded(true);
      setTimeout(() => {
        setAnimationState('expanding');
      }, ANIMATION_DELAY);
    }
  };

  const getDetailsClassName = () => {
    const baseClass = 'energy-price-details';
    if (!isExpanded && animationState === 'collapsed') {
      return `${baseClass} ${baseClass}--collapsed`;
    }
    if (animationState === 'collapsing') {
      return `${baseClass} ${baseClass}--collapsing`;
    }
    return `${baseClass} ${baseClass}--expanded`;
  };

  if (!hourlyPrices?.length) {
    return null;
  }

  const stats = calculatePriceStats(hourlyPrices);

  return (
    <>
      <div
        className="energy-market-data"
        onClick={handleToggle}
        style={{ cursor: "pointer", position: "relative" }}
      >
        {hourlyPrices.map((item, index) => {
          const price = parsePrice(item.pricePerKWh);
          const isAboveThreshold = price > PRICE_THRESHOLD;

          return (
            <div
              key={`${index}-${item.priceCategory}`}
              className={`price-category price-category-${item.priceCategory} ${isAboveThreshold ? 'above-threshold' : ''}`}
              title={`${item.time}: ${item.pricePerKWh}`}
            />
          );
        })}
      </div>

      <div className={getDetailsClassName()}>
        <div className="price-details-content">
          <div className="price-periods">
          <div className="period">
            <span className="label">Minimum</span>
            <span className="value">{stats.min?.price || "-"}</span>
            <span className="time">{stats.min?.time || ""} Uhr</span>
          </div>
          <div className="period">
            <span className="label">Maximum</span>
            <span className="value">{stats.max?.price || "-"}</span>
            <span className="time">{stats.max?.time || ""} Uhr</span>
          </div>
          <div className="period">
            <span className="label">Aktuell</span>
            <span className="value">{stats.current?.price || "-"}</span>
            <span className="time">Ø {stats.avgDiff || ""}</span>
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
                <span className="label">Tendenz (4h)</span>
                <span
                  className="value"
                  dangerouslySetInnerHTML={{ __html: stats.trend }}
                />
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      <hr />
    </>
  );
};
