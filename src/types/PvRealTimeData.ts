export type PowerGridMode = "idle" | "buy" | "sell";

export interface PvRealTimeData {
  loadsPow: string;
  pvPow: string;
  pwPowEfficiency: string;
  selfProdPowShare: string;
  gridPow: string;
  gridPowPercentage: string;
  gridMode: PowerGridMode;
  feedinPow: string;
  batSoC: string;
  batStatus: string;
  batPower: string;
  batIcon: string;
  cumulative: string;
  cached: boolean;
}
