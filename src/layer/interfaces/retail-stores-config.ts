import type { RgbaColor } from 'react-colorful';

export interface RetailStoresConfig {
  strokeColor: RgbaColor;
  strokeWeight: number;
  pointRadius: number;
  fillFromColor: RgbaColor;
  fillToColor: RgbaColor;
  fillSteps: number;
  revenueRange: [number, number];
}
