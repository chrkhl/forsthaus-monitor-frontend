import { PriceData } from "../types/PriceData";

export const EnergyMarketData = ({
  hourlyPrices,
}: {
  hourlyPrices: Array<PriceData>
}) => {
  if (!hourlyPrices?.length) {
    return null;
  }

  return (
    <>
      <div className="energy-market-data">
        {hourlyPrices.map((item, index) => (
          <div
            key={`${index}-${item.priceCategory}`}
            className={`price-category price-category-${item.priceCategory}`}
            title={`${item.time}: ${item.pricePerKWh}`}
          />
        ))}
      </div>
      <hr />
    </>
  );
};
