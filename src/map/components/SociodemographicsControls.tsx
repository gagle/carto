import { SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG } from '@/layer';
import { rgbaToString } from '@/utilities';
import { Button, Popover, Slider, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import type { RgbaColor } from 'react-colorful';
import styled from 'styled-components';

const ControlGroup = styled.div`
  margin-bottom: 24px;
`;

const LayerSection = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #dddddd;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ColorButton = styled(Button)<{ $color: string }>`
  && {
    width: 80px;
    height: 30px;
    background-color: ${(props) => props.$color};
    border: 1px solid #cccccc;
    min-width: 80px;
    padding: 0;

    &:hover {
      background-color: ${(props) => props.$color};
      opacity: 0.9;
    }
  }
`;

const ColorPickerWrapper = styled.div`
  padding: 16px;

  .react-colorful {
    width: 200px;
    height: 200px;
  }
`;

const HorizontalColorGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
`;

const ColorPickerItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  flex: 1;
`;

const ColorLabel = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
`;

const ControlLabel = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
`;

export interface SociodemographicsConfig {
  strokeColor: RgbaColor;
  strokeWeight: number;
  fillFromColor: RgbaColor;
  fillToColor: RgbaColor;
  fillSteps: number;
  populationRange: [number, number];
}

interface SociodemographicsControlsProps {
  onChange: (config: SociodemographicsConfig) => void;
}

export function SociodemographicsControls({ onChange }: SociodemographicsControlsProps) {
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  const [strokeColor, setStrokeColor] = useState<RgbaColor>(SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG.strokeColor);
  const [strokeWeight, setStrokeWeight] = useState(SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG.strokeWeight);
  const [fillFromColor, setStartColor] = useState<RgbaColor>(SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG.fillFromColor);
  const [fillToColor, setEndColor] = useState<RgbaColor>(SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG.fillToColor);
  const [fillSteps, setSteps] = useState(SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG.fillSteps);
  const [populationRange, setPopulationRange] = useState<[number, number]>(
    SOCIODEMOGRAPHICS_LAYER_DEFAULT_CONFIG.populationRange
  );

  const handleChange = (updates: Partial<SociodemographicsConfig>) => {
    onChange({
      strokeColor,
      strokeWeight,
      fillFromColor,
      fillToColor,
      fillSteps,
      populationRange,
      ...updates,
    });
  };

  const handleStrokeWeightChange = (value: number) => {
    if (typeof value === 'number') {
      setStrokeWeight(value);
      handleChange({ strokeWeight: value });
    }
  };

  const handleStepsChange = (value: number) => {
    if (typeof value === 'number') {
      setSteps(value);
      handleChange({ fillSteps: value });
    }
  };

  const handlePopulationRangeChange = (value: number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const range: [number, number] = [value[0], value[1]];
      setPopulationRange(range);
      handleChange({ populationRange: range });
    }
  };

  const handleStrokeColorChange = (color: RgbaColor) => {
    setStrokeColor(color);
    handleChange({ strokeColor: color });
  };

  const handleStartColorChange = (color: RgbaColor) => {
    setStartColor(color);
    handleChange({ fillFromColor: color });
  };

  const handleEndColorChange = (color: RgbaColor) => {
    setEndColor(color);
    handleChange({ fillToColor: color });
  };

  const handleColorButtonClick = (event: React.MouseEvent<HTMLElement>, pickerId: string) => {
    setColorPickerAnchor(event.currentTarget);
    setActiveColorPicker(pickerId);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setActiveColorPicker(null);
  };

  return (
    <LayerSection>
      <Tooltip title="sociodemographics_usa_blockgroup" placement="bottom">
        <SectionTitle variant="h5">sociodemographics_usa_blockgroup</SectionTitle>
      </Tooltip>
      <ControlGroup>
        <ControlLabel gutterBottom>Stroke color</ControlLabel>
        <ColorButton $color={rgbaToString(strokeColor)} onClick={(e) => handleColorButtonClick(e, 'strokeColor')} />
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Stroke weight</ControlLabel>
        <Slider
          value={strokeWeight}
          onChange={(_, value) => handleStrokeWeightChange(value)}
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Fill color gradients</ControlLabel>
        <HorizontalColorGroup>
          <ColorPickerItem>
            <ColorLabel>From</ColorLabel>
            <ColorButton
              $color={rgbaToString(fillFromColor)}
              onClick={(e) => handleColorButtonClick(e, 'fillFromColor')}
            />
          </ColorPickerItem>
          <ColorPickerItem>
            <ColorLabel>To</ColorLabel>
            <ColorButton $color={rgbaToString(fillToColor)} onClick={(e) => handleColorButtonClick(e, 'fillToColor')} />
          </ColorPickerItem>
        </HorizontalColorGroup>
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Gradient steps</ControlLabel>
        <Slider
          value={fillSteps}
          onChange={(_, value) => handleStepsChange(value)}
          min={2}
          max={10}
          step={1}
          valueLabelDisplay="auto"
        />
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Population range</ControlLabel>
        <Slider
          value={populationRange}
          onChange={(_, value) => handlePopulationRangeChange(value)}
          min={0}
          max={10000}
          step={100}
          valueLabelDisplay="auto"
        />
      </ControlGroup>

      <Popover
        open={!!colorPickerAnchor}
        anchorEl={colorPickerAnchor}
        onClose={handleColorPickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ColorPickerWrapper>
          {activeColorPicker === 'strokeColor' && (
            <RgbaColorPicker color={strokeColor} onChange={handleStrokeColorChange} />
          )}
          {activeColorPicker === 'fillFromColor' && (
            <RgbaColorPicker color={fillFromColor} onChange={handleStartColorChange} />
          )}
          {activeColorPicker === 'fillToColor' && (
            <RgbaColorPicker color={fillToColor} onChange={handleEndColorChange} />
          )}
        </ColorPickerWrapper>
      </Popover>
    </LayerSection>
  );
}
