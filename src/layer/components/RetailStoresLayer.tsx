import { getRetailStoresSource, type RetailStoresProperties } from '@/data-source';
import { getGradientColor } from '@/utilities';
import { VectorTileLayer } from '@deck.gl/carto';
import type { PickingInfo } from '@deck.gl/core';
import type { Feature, Geometry } from 'geojson';
import type { RgbaColor } from 'react-colorful';

export interface RetailStoresLayerProps {
  getLineColor: () => RgbaColor;
  getStrokeWeight: () => number;
  getPointRadius: () => number;
  getColorPalette: () => string[];
  getRevenueRange: () => number[];
  onHover: (info: PickingInfo<{ properties: RetailStoresProperties }>) => void;
}

export function createRetailStoresLayer({
  getLineColor,
  getStrokeWeight,
  getPointRadius,
  getColorPalette,
  getRevenueRange,
  onHover,
}: RetailStoresLayerProps): VectorTileLayer {
  const lineColor = getLineColor();
  const strokeWeight = getStrokeWeight();
  const pointRadius = getPointRadius();
  const colorPalette = getColorPalette();
  const revenueRange = getRevenueRange();

  return new VectorTileLayer({
    id: 'retail-stores',
    pickable: true,
    data: getRetailStoresSource(),
    getLineColor: [lineColor.r, lineColor.g, lineColor.b, lineColor.a * 255],
    getFillColor: (feature: Feature<Geometry, RetailStoresProperties>) => {
      const palette = getColorPalette();
      const range = getRevenueRange();
      return getGradientColor(feature.properties.revenue, palette, range[0], range[1]);
    },
    lineWidthMinPixels: strokeWeight,
    pointRadiusMinPixels: pointRadius,
    onHover,
    updateTriggers: {
      getLineColor: lineColor,
      getFillColor: [colorPalette, revenueRange],
      lineWidthMinPixels: strokeWeight,
      pointRadiusMinPixels: pointRadius,
    },
  });
}
