import type { RgbaColor } from 'react-colorful';

export interface SociodemographicsConfig {
  strokeColor: RgbaColor;
  strokeWeight: number;
  fillFromColor: RgbaColor;
  fillToColor: RgbaColor;
  fillSteps: number;
  populationRange: [number, number];
}
