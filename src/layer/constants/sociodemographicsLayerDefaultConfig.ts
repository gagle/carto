import { chromaToColorPickerRgba } from '@/utilities';
import chroma from 'chroma-js';
import type { RgbaColor } from 'react-colorful';

export interface SociodemographicsConfig {
  strokeColor: RgbaColor;
  strokeWeight: number;
  fillFromColor: RgbaColor;
  fillToColor: RgbaColor;
  fillSteps: number;
  populationRange: [number, number];
}

export const SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG: SociodemographicsConfig = {
  strokeColor: chromaToColorPickerRgba(chroma('#ddb27c')),
  strokeWeight: 1,
  fillFromColor: chromaToColorPickerRgba(chroma('#318e95')),
  fillToColor: chromaToColorPickerRgba(chroma('#e8f5f5')),
  fillSteps: 5,
  populationRange: [0, 5000],
};
