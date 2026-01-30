import { getRetailStoresSource, type RetailStoresProperties } from '@/data-source';
import type { RetailStoresConfig } from '../interfaces/retail-stores-config';
import { generateColors, getGradientColor } from '@/utilities';
import { VectorTileLayer } from '@deck.gl/carto';
import type { PickingInfo } from '@deck.gl/core';
import chroma from 'chroma-js';
import type { Feature, Geometry } from 'geojson';

export interface RetailStoresLayerProps {
  config: RetailStoresConfig;
  onHover: (info: PickingInfo<{ properties: RetailStoresProperties }>) => void;
}

export function createRetailStoresVectorTileLayer({ config, onHover }: RetailStoresLayerProps): VectorTileLayer {
  const colorPalette = generateColors(
    chroma([config.fillFromColor.r, config.fillFromColor.g, config.fillFromColor.b])
      .alpha(config.fillFromColor.a)
      .hex(),
    chroma([config.fillToColor.r, config.fillToColor.g, config.fillToColor.b]).alpha(config.fillToColor.a).hex(),
    config.fillSteps
  );

  return new VectorTileLayer({
    id: 'retail-stores',
    pickable: true,
    data: getRetailStoresSource(),
    getLineColor: [config.strokeColor.r, config.strokeColor.g, config.strokeColor.b, config.strokeColor.a * 255],
    getFillColor: (feature: Feature<Geometry, RetailStoresProperties>) => {
      return getGradientColor(feature.properties.revenue, colorPalette, config.revenueRange[0], config.revenueRange[1]);
    },
    lineWidthMinPixels: config.strokeWeight,
    pointRadiusMinPixels: config.pointRadius,
    onHover,
    updateTriggers: {
      getLineColor: config.strokeColor,
      getFillColor: [config.fillFromColor, config.fillToColor, config.fillSteps, config.revenueRange],
      lineWidthMinPixels: config.strokeWeight,
      pointRadiusMinPixels: config.pointRadius,
    },
  });
}
