import chroma from 'chroma-js';
import type { RetailStoresConfig } from '../../map/components/RetailStoresControls';
import { chromaToColorPickerRgba } from '@/utilities';

export const RETAIL_STORES_LAYER_DEFAULT_CONFIG: RetailStoresConfig = {
  strokeColor: chromaToColorPickerRgba(chroma('#9fbee0')),
  strokeWeight: 1,
  pointRadius: 5,
  fillFromColor: chromaToColorPickerRgba(chroma('#8b3058')),
  fillToColor: chromaToColorPickerRgba(chroma('#ffc6c4')),
  fillSteps: 5,
  revenueRange: [1000000, 2000000],
};
