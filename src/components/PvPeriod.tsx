import { PvSummaryData } from "../types/PvSummaryData";

export const PvPeriod = ({ data }: { data: PvSummaryData }) => {
  return (
    <div className="period">
      <span className="label">{data.label}</span>
      <span className="value">{data.sumGeneration}</span>
      <span className="value small">
        ▸ {data.sumGridConsumption} ⏐ {data.sumFeedin} ▸
      </span>
    </div>
  );
};