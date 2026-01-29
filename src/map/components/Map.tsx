import { getRetailStoresSource, getSociodemographicUsaSource } from '@/data-source';
import { BASEMAP, VectorTileLayer } from '@deck.gl/carto';
import { type MapViewState } from '@deck.gl/core';
import { DeckGL } from '@deck.gl/react';
import { Map as MapGL } from 'react-map-gl/maplibre';

export function Map() {
  const layers = [
    new VectorTileLayer({
      id: 'sociodemographics-usa',
      data: getSociodemographicUsaSource(),
      lineWidthMinPixels: 1,
      getFillColor: [0, 200, 0, 20],
    }),
    new VectorTileLayer({
      id: 'retail-stores',
      pickable: true,
      data: getRetailStoresSource(),
      pointRadiusMinPixels: 3,
      getLineColor: [0, 0, 0, 200],
      getFillColor: [238, 77, 90],
      lineWidthMinPixels: 1,
    }),
  ];

  const viewState: MapViewState = {
    latitude: 39.8097343,
    longitude: -98.5556199,
    zoom: 4,
    bearing: 0,
    pitch: 30,
  };

  return (
    <DeckGL initialViewState={viewState} controller={true} layers={layers}>
      <MapGL mapStyle={BASEMAP.POSITRON} />
    </DeckGL>
  );
}
