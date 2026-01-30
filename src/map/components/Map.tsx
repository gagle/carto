import { type RetailStoresProperties, type SociodemographicsUsaProperties } from '@/data-source';
import { LayerTooltip } from '@/cdk/layer';
import {
  createRetailStoresLayer,
  createSociodemographicsLayer,
  getTooltipSociodemographicsData,
  getTooltipRetailStoresData,
} from '@/layer';
import {
  RetailStoresControls,
  type RetailStoresConfig,
  type RetailStoresControlsRef,
} from './RetailStoresControls';
import {
  SociodemographicsControls,
  type SociodemographicsConfig,
  type SociodemographicsControlsRef,
} from './SociodemographicsControls';
import { RETAIL_STORES_DEFAULT_CONFIG } from './retail-stores-defaults';
import { SOCIODEMOGRAPHICS_DEFAULT_CONFIG } from './sociodemographics-defaults';
import { generateColors } from '@/utilities';
import { BASEMAP } from '@deck.gl/carto';
import { type MapViewState, type PickingInfo } from '@deck.gl/core';
import { DeckGL } from '@deck.gl/react';
import { Popover } from '@mui/material';
import chroma from 'chroma-js';
import React, { useState, useRef } from 'react';
import { RgbaColorPicker } from 'react-colorful';
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

const ColorPickerWrapper = styled.div`
  padding: 16px;

  .react-colorful {
    width: 200px;
    height: 200px;
  }
`;

export function Map() {
  // Refs for control components
  const retailStoresControlsRef = useRef<RetailStoresControlsRef>(null);
  const sociodemographicsControlsRef = useRef<SociodemographicsControlsRef>(null);

  // Popover state
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  // Configuration state
  const [retailStoresConfig, setRetailStoresConfig] = useState<RetailStoresConfig>(RETAIL_STORES_DEFAULT_CONFIG);
  const [sociodemographicsConfig, setSociodemographicsConfig] = useState<SociodemographicsConfig>(
    SOCIODEMOGRAPHICS_DEFAULT_CONFIG
  );

  // Hover info state
  const [retailStoresHoverInfo, setRetailStoresHoverInfo] = useState<PickingInfo<{ properties: RetailStoresProperties }>>();
  const [sociodemographicsHoverInfo, setSociodemographicsHoverInfo] = useState<
    PickingInfo<{ properties: SociodemographicsUsaProperties }>
  >();

  // Helper functions for color picker popover
  const handleColorButtonClick = (event: React.MouseEvent<HTMLElement>, pickerId: string) => {
    setColorPickerAnchor(event.currentTarget);
    setActiveColorPicker(pickerId);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setActiveColorPicker(null);
  };

  // Generate color palettes
  const retailStoresColorPalette = generateColors(
    chroma([retailStoresConfig.startColor.r, retailStoresConfig.startColor.g, retailStoresConfig.startColor.b])
      .alpha(retailStoresConfig.startColor.a)
      .hex(),
    chroma([retailStoresConfig.endColor.r, retailStoresConfig.endColor.g, retailStoresConfig.endColor.b])
      .alpha(retailStoresConfig.endColor.a)
      .hex(),
    retailStoresConfig.steps
  );

  const sociodemographicsColorPalette = generateColors(
    chroma([sociodemographicsConfig.startColor.r, sociodemographicsConfig.startColor.g, sociodemographicsConfig.startColor.b])
      .alpha(sociodemographicsConfig.startColor.a)
      .hex(),
    chroma([sociodemographicsConfig.endColor.r, sociodemographicsConfig.endColor.g, sociodemographicsConfig.endColor.b])
      .alpha(sociodemographicsConfig.endColor.a)
      .hex(),
    sociodemographicsConfig.steps
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

  const tooltipRetailStoresData = getTooltipRetailStoresData(retailStoresHoverInfo);
  const tooltipSociodemographicsData = getTooltipSociodemographicsData(sociodemographicsHoverInfo);

  return (
    <Container>
      <Sidebar>
        <RetailStoresControls
          ref={retailStoresControlsRef}
          onChange={setRetailStoresConfig}
          onColorPickerOpen={handleColorButtonClick}
        />

        <SociodemographicsControls
          ref={sociodemographicsControlsRef}
          onChange={setSociodemographicsConfig}
          onColorPickerOpen={handleColorButtonClick}
        />

        <Popover
          open={Boolean(colorPickerAnchor)}
          anchorEl={colorPickerAnchor}
          onClose={handleColorPickerClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ColorPickerWrapper>
            {activeColorPicker === 'retailLine' && retailStoresControlsRef.current && (
              <RgbaColorPicker
                color={retailStoresControlsRef.current.getStrokeColor()}
                onChange={(color) => retailStoresControlsRef.current?.setStrokeColor(color)}
              />
            )}
            {activeColorPicker === 'retailStart' && retailStoresControlsRef.current && (
              <RgbaColorPicker
                color={retailStoresControlsRef.current.getStartColor()}
                onChange={(color) => retailStoresControlsRef.current?.setStartColor(color)}
              />
            )}
            {activeColorPicker === 'retailEnd' && retailStoresControlsRef.current && (
              <RgbaColorPicker
                color={retailStoresControlsRef.current.getEndColor()}
                onChange={(color) => retailStoresControlsRef.current?.setEndColor(color)}
              />
            )}
            {activeColorPicker === 'demoLine' && sociodemographicsControlsRef.current && (
              <RgbaColorPicker
                color={sociodemographicsControlsRef.current.getStrokeColor()}
                onChange={(color) => sociodemographicsControlsRef.current?.setStrokeColor(color)}
              />
            )}
            {activeColorPicker === 'demoStart' && sociodemographicsControlsRef.current && (
              <RgbaColorPicker
                color={sociodemographicsControlsRef.current.getStartColor()}
                onChange={(color) => sociodemographicsControlsRef.current?.setStartColor(color)}
              />
            )}
            {activeColorPicker === 'demoEnd' && sociodemographicsControlsRef.current && (
              <RgbaColorPicker
                color={sociodemographicsControlsRef.current.getEndColor()}
                onChange={(color) => sociodemographicsControlsRef.current?.setEndColor(color)}
              />
            )}
          </ColorPickerWrapper>
        </Popover>
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
