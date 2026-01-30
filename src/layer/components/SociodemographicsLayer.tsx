import { getSociodemographicUsaSource, type SociodemographicsUsaProperties } from '@/data-source';
import { getGradientColor } from '@/utilities';
import { VectorTileLayer } from '@deck.gl/carto';
import type { PickingInfo } from '@deck.gl/core';
import type { Feature, Geometry } from 'geojson';
import type { RgbaColor } from 'react-colorful';

interface SociodemographicsLayerProps {
  getLineColor: () => RgbaColor;
  getStrokeWeight: () => number;
  getColorPalette: () => string[];
  getPopulationRange: () => number[];
  onHover: (info: PickingInfo<{ properties: SociodemographicsUsaProperties }>) => void;
}

export function createSociodemographicsLayer({
  getLineColor,
  getStrokeWeight,
  getColorPalette,
  getPopulationRange,
  onHover,
}: SociodemographicsLayerProps): VectorTileLayer {
  const lineColor = getLineColor();
  const strokeWeight = getStrokeWeight();
  const colorPalette = getColorPalette();
  const populationRange = getPopulationRange();

  return new VectorTileLayer({
    id: 'sociodemographics-usa',
    pickable: true,
    data: getSociodemographicUsaSource(),
    getFillColor: (feature: Feature<Geometry, SociodemographicsUsaProperties>) => {
      const palette = getColorPalette();
      const range = getPopulationRange();
      return getGradientColor(feature.properties.total_pop, palette, range[0], range[1]);
    },
    getLineColor: [lineColor.r, lineColor.g, lineColor.b, lineColor.a * 255],
    lineWidthMinPixels: strokeWeight,
    onHover,
    updateTriggers: {
      getFillColor: [colorPalette, populationRange],
      getLineColor: lineColor,
      lineWidthMinPixels: strokeWeight,
    },
  });
}
