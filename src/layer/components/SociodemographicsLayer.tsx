import { getSociodemographicUsaSource, type SociodemographicsUsaProperties } from '@/data-source';
import type { SociodemographicsConfig } from '../interfaces/sociodemographics-config';
import { generateColors, getGradientColor } from '@/utilities';
import { VectorTileLayer } from '@deck.gl/carto';
import type { PickingInfo } from '@deck.gl/core';
import chroma from 'chroma-js';
import type { Feature, Geometry } from 'geojson';

export interface SociodemographicsLayerProps {
  config: SociodemographicsConfig;
  onHover: (info: PickingInfo<{ properties: SociodemographicsUsaProperties }>) => void;
}

export function createSociodemographicsVectorTileLayer({
  config,
  onHover,
}: SociodemographicsLayerProps): VectorTileLayer {
  const colorPalette = generateColors(
    chroma([config.fillFromColor.r, config.fillFromColor.g, config.fillFromColor.b])
      .alpha(config.fillFromColor.a)
      .hex(),
    chroma([config.fillToColor.r, config.fillToColor.g, config.fillToColor.b]).alpha(config.fillToColor.a).hex(),
    config.fillSteps
  );

  return new VectorTileLayer({
    id: 'sociodemographics-usa',
    pickable: true,
    data: getSociodemographicUsaSource(),
    getFillColor: (feature: Feature<Geometry, SociodemographicsUsaProperties>) => {
      return getGradientColor(
        feature.properties.total_pop,
        colorPalette,
        config.populationRange[0],
        config.populationRange[1]
      );
    },
    getLineColor: [config.strokeColor.r, config.strokeColor.g, config.strokeColor.b, config.strokeColor.a * 255],
    lineWidthMinPixels: config.strokeWeight,
    onHover,
    updateTriggers: {
      getFillColor: [config.fillFromColor, config.fillToColor, config.fillSteps, config.populationRange],
      getLineColor: config.strokeColor,
      lineWidthMinPixels: config.strokeWeight,
    },
  });
}
