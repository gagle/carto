import { type RetailStoresProperties, type SociodemographicsUsaProperties } from '@/data-source';
import { LayerTooltip } from '@/cdk/layer';
import {
  createRetailStoresLayer,
  createSociodemographicsLayer,
  getTooltipLayerSociodemographicsData,
  getTooltipLayerRetailStoresData,
  RETAIL_STORES_LAYER_DEFAULT_CONFIG,
  SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG,
} from '@/layer';
import { RetailStoresControls, type RetailStoresConfig } from './RetailStoresControls';
import { SociodemographicsControls, type SociodemographicsConfig } from './SociodemographicsControls';
import { generateColors } from '@/utilities';
import { BASEMAP } from '@deck.gl/carto';
import { type MapViewState, type PickingInfo } from '@deck.gl/core';
import { DeckGL } from '@deck.gl/react';
import chroma from 'chroma-js';
import { useState } from 'react';
import { Map as MapGL } from 'react-map-gl/maplibre';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100dvw;
  height: 100dvh;
`;

const Sidebar = styled.div`
  width: 400px;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
`;

export function Map() {
  const [retailStoresConfig, setRetailStoresConfig] = useState<RetailStoresConfig>(RETAIL_STORES_LAYER_DEFAULT_CONFIG);
  const [sociodemographicsConfig, setSociodemographicsConfig] = useState<SociodemographicsConfig>(
    SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG
  );

  const [retailStoresHoverInfo, setRetailStoresHoverInfo] = useState<PickingInfo<{ properties: RetailStoresProperties }>>();
  const [sociodemographicsHoverInfo, setSociodemographicsHoverInfo] = useState<
    PickingInfo<{ properties: SociodemographicsUsaProperties }>
  >();
  const retailStoresColorPalette = generateColors(
    chroma([retailStoresConfig.fillFromColor.r, retailStoresConfig.fillFromColor.g, retailStoresConfig.fillFromColor.b])
      .alpha(retailStoresConfig.fillFromColor.a)
      .hex(),
    chroma([retailStoresConfig.fillToColor.r, retailStoresConfig.fillToColor.g, retailStoresConfig.fillToColor.b])
      .alpha(retailStoresConfig.fillToColor.a)
      .hex(),
    retailStoresConfig.fillSteps
  );

  const sociodemographicsColorPalette = generateColors(
    chroma([sociodemographicsConfig.fillFromColor.r, sociodemographicsConfig.fillFromColor.g, sociodemographicsConfig.fillFromColor.b])
      .alpha(sociodemographicsConfig.fillFromColor.a)
      .hex(),
    chroma([sociodemographicsConfig.fillToColor.r, sociodemographicsConfig.fillToColor.g, sociodemographicsConfig.fillToColor.b])
      .alpha(sociodemographicsConfig.fillToColor.a)
      .hex(),
    sociodemographicsConfig.fillSteps
  );

  const layers = [
    createSociodemographicsLayer({
      getLineColor: () => sociodemographicsConfig.strokeColor,
      getStrokeWeight: () => sociodemographicsConfig.strokeWeight,
      getColorPalette: () => sociodemographicsColorPalette,
      getPopulationRange: () => sociodemographicsConfig.populationRange,
      onHover: setSociodemographicsHoverInfo,
    }),
    createRetailStoresLayer({
      getLineColor: () => retailStoresConfig.strokeColor,
      getStrokeWeight: () => retailStoresConfig.strokeWeight,
      getPointRadius: () => retailStoresConfig.pointRadius,
      getColorPalette: () => retailStoresColorPalette,
      getRevenueRange: () => retailStoresConfig.revenueRange,
      onHover: setRetailStoresHoverInfo,
    }),
  ];

  const viewState: MapViewState = {
    latitude: 39.8097343,
    longitude: -98.5556199,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  };

  const tooltipRetailStoresData = getTooltipLayerRetailStoresData(retailStoresHoverInfo);
  const tooltipSociodemographicsData = getTooltipLayerSociodemographicsData(sociodemographicsHoverInfo);

  return (
    <Container>
      <Sidebar>
        <RetailStoresControls onChange={setRetailStoresConfig} />
        <SociodemographicsControls onChange={setSociodemographicsConfig} />
      </Sidebar>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        style={{ position: 'relative', flex: '1' }}
      >
        <MapGL mapStyle={BASEMAP.POSITRON} />
        {tooltipRetailStoresData && (
          <LayerTooltip x={tooltipRetailStoresData.x} y={tooltipRetailStoresData.y} items={tooltipRetailStoresData.items} />
        )}
        {tooltipSociodemographicsData && (
          <LayerTooltip
            x={tooltipSociodemographicsData.x}
            y={tooltipSociodemographicsData.y}
            items={tooltipSociodemographicsData.items}
          />
        )}
      </DeckGL>
    </Container>
  );
}
