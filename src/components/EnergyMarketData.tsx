export const EnergyMarketData = ({
  hourlyPriceCategories,
}: {
  hourlyPriceCategories: number[];
}) => {
  if (!hourlyPriceCategories?.length) {
    return null;
  }

  return (
    <>
      <div className="energy-market-data">
        {hourlyPriceCategories.map((priceCategory, index) => (
          <div
            key={`${index}-${{ priceCategory }}`}
            className={`price-category price-category-${priceCategory}`}
          />
        ))}
      </div>
      <hr />
    </>
  );
};
