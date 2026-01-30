import chroma from 'chroma-js';
import type { SociodemographicsConfig } from '../../map/components/SociodemographicsControls';
import { chromaToColorPickerRgba } from '@/utilities';

export const SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG: SociodemographicsConfig = {
  strokeColor: chromaToColorPickerRgba(chroma('#ddb27c')),
  strokeWeight: 1,
  fillFromColor: chromaToColorPickerRgba(chroma('#318e95')),
  fillToColor: chromaToColorPickerRgba(chroma('#e8f5f5')),
  fillSteps: 5,
  populationRange: [0, 5000],
};
