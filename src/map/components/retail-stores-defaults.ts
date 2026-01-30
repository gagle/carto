import { chromaToColorPickerRgba } from '@/utilities';
import chroma from 'chroma-js';
import type { RetailStoresConfig } from './RetailStoresControls';

export const RETAIL_STORES_DEFAULT_CONFIG: RetailStoresConfig = {
  strokeColor: chromaToColorPickerRgba(chroma('#9fbee0')),
  strokeWeight: 1,
  pointRadius: 5,
  startColor: chromaToColorPickerRgba(chroma('#8b3058')),
  endColor: chromaToColorPickerRgba(chroma('#ffc6c4')),
  steps: 5,
  revenueRange: [1000000, 2000000],
};
