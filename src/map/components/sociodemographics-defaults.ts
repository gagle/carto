import { chromaToColorPickerRgba } from '@/utilities';
import chroma from 'chroma-js';
import type { SociodemographicsConfig } from './SociodemographicsControls';

export const SOCIODEMOGRAPHICS_DEFAULT_CONFIG: SociodemographicsConfig = {
  strokeColor: chromaToColorPickerRgba(chroma('#ddb27c')),
  strokeWeight: 1,
  startColor: chromaToColorPickerRgba(chroma('#318e95')),
  endColor: chromaToColorPickerRgba(chroma('#e8f5f5')),
  steps: 5,
  populationRange: [0, 5000],
};
