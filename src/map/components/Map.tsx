import {
  RETAIL_STORES_LAYER_DEFAULT_CONFIG,
  SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG,
  type RetailStoresLayerDefaultConfig,
  type SociodemographicsConfig,
} from '@/layer';
import { RetailStoresControls } from './RetailStoresControls';
import { SociodemographicsControls } from './SociodemographicsControls';
import { useRetailStoresLayer } from './useRetailStoresLayer';
import { useSociodemographicsLayer } from './useSociodemographicsLayer';
import { BASEMAP } from '@deck.gl/carto';
import { type MapViewState } from '@deck.gl/core';
import { DeckGL } from '@deck.gl/react';
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
  const [retailStoresConfig, setRetailStoresConfig] = useState<RetailStoresLayerDefaultConfig>(
    RETAIL_STORES_LAYER_DEFAULT_CONFIG
  );
  const [sociodemographicsConfig, setSociodemographicsConfig] = useState<SociodemographicsConfig>(
    SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG
  );

  const retailStoresLayer = useRetailStoresLayer(retailStoresConfig);
  const sociodemographicsLayer = useSociodemographicsLayer(sociodemographicsConfig);

  const layers = [sociodemographicsLayer.layer, retailStoresLayer.layer];

  const viewState: MapViewState = {
    latitude: 39.8097343,
    longitude: -98.5556199,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  };

  return (
    <Container>
      <Sidebar>
        <RetailStoresControls onChange={setRetailStoresConfig} dataSource={retailStoresLayer.dataSource} />
        <SociodemographicsControls onChange={setSociodemographicsConfig} />
      </Sidebar>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        style={{ position: 'relative', flex: '1' }}
      >
        <MapGL mapStyle={BASEMAP.POSITRON} />
        {retailStoresLayer.tooltip}
        {sociodemographicsLayer.tooltip}
      </DeckGL>
    </Container>
  );
}
