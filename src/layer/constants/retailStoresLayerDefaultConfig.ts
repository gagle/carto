import { chromaToColorPickerRgba } from '@/utilities';
import chroma from 'chroma-js';
import type { RgbaColor } from 'react-colorful';

export interface RetailStoresLayerDefaultConfig {
  strokeColor: RgbaColor;
  strokeWeight: number;
  pointRadius: number;
  fillFromColor: RgbaColor;
  fillToColor: RgbaColor;
  fillSteps: number;
  revenueRange: [number, number];
}

export const RETAIL_STORES_LAYER_DEFAULT_CONFIG: RetailStoresLayerDefaultConfig = {
  strokeColor: chromaToColorPickerRgba(chroma('#9fbee0')),
  strokeWeight: 1,
  pointRadius: 5,
  fillFromColor: chromaToColorPickerRgba(chroma('#8b3058')),
  fillToColor: chromaToColorPickerRgba(chroma('#ffc6c4')),
  fillSteps: 5,
  revenueRange: [1000000, 2000000],
};
