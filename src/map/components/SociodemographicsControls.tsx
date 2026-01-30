import { rgbaToString } from '@/utilities';
import { Button, Slider, Tooltip, Typography } from '@mui/material';
import React, { useState, useImperativeHandle } from 'react';
import type { RgbaColor } from 'react-colorful';
import styled from 'styled-components';
import { SOCIODEMOGRAPHICS_DEFAULT_CONFIG } from './sociodemographics-defaults';

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
  startColor: RgbaColor;
  endColor: RgbaColor;
  steps: number;
  populationRange: number[];
}

export interface SociodemographicsControlsRef {
  getStrokeColor: () => RgbaColor;
  setStrokeColor: (color: RgbaColor) => void;
  getStartColor: () => RgbaColor;
  setStartColor: (color: RgbaColor) => void;
  getEndColor: () => RgbaColor;
  setEndColor: (color: RgbaColor) => void;
}

interface SociodemographicsControlsProps {
  onChange: (config: SociodemographicsConfig) => void;
  onColorPickerOpen: (event: React.MouseEvent<HTMLElement>, pickerId: string) => void;
}

export const SociodemographicsControls = React.forwardRef<SociodemographicsControlsRef, SociodemographicsControlsProps>(
  ({ onChange, onColorPickerOpen }, ref) => {
  const [strokeColor, setStrokeColor] = useState<RgbaColor>(SOCIODEMOGRAPHICS_DEFAULT_CONFIG.strokeColor);
  const [strokeWeight, setStrokeWeight] = useState(SOCIODEMOGRAPHICS_DEFAULT_CONFIG.strokeWeight);
  const [startColor, setStartColor] = useState<RgbaColor>(SOCIODEMOGRAPHICS_DEFAULT_CONFIG.startColor);
  const [endColor, setEndColor] = useState<RgbaColor>(SOCIODEMOGRAPHICS_DEFAULT_CONFIG.endColor);
  const [steps, setSteps] = useState(SOCIODEMOGRAPHICS_DEFAULT_CONFIG.steps);
  const [populationRange, setPopulationRange] = useState<number[]>(SOCIODEMOGRAPHICS_DEFAULT_CONFIG.populationRange);

  const handleChange = (updates: Partial<SociodemographicsConfig>) => {
    const newConfig = {
      strokeColor,
      strokeWeight,
      startColor,
      endColor,
      steps,
      populationRange,
      ...updates,
    };
    onChange(newConfig);
  };

  const handleStrokeWeightChange = (value: number) => {
    setStrokeWeight(value);
    handleChange({ strokeWeight: value });
  };

  const handleStepsChange = (value: number) => {
    setSteps(value);
    handleChange({ steps: value });
  };

  const handlePopulationRangeChange = (value: number[]) => {
    setPopulationRange(value);
    handleChange({ populationRange: value });
  };

  useImperativeHandle(ref, () => ({
    getStrokeColor: () => strokeColor,
    setStrokeColor: (color: RgbaColor) => {
      setStrokeColor(color);
      handleChange({ strokeColor: color });
    },
    getStartColor: () => startColor,
    setStartColor: (color: RgbaColor) => {
      setStartColor(color);
      handleChange({ startColor: color });
    },
    getEndColor: () => endColor,
    setEndColor: (color: RgbaColor) => {
      setEndColor(color);
      handleChange({ endColor: color });
    },
  }));

  return (
    <LayerSection>
      <Tooltip title="sociodemographics_usa_blockgroup" placement="bottom">
        <SectionTitle variant="h5">sociodemographics_usa_blockgroup</SectionTitle>
      </Tooltip>
      <ControlGroup>
        <ControlLabel gutterBottom>Stroke color</ControlLabel>
        <ColorButton $color={rgbaToString(strokeColor)} onClick={(e) => onColorPickerOpen(e, 'demoLine')} />
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Stroke weight</ControlLabel>
        <Slider
          value={strokeWeight}
          onChange={(_, value) => handleStrokeWeightChange(value as number)}
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
            <ColorButton $color={rgbaToString(startColor)} onClick={(e) => onColorPickerOpen(e, 'demoStart')} />
          </ColorPickerItem>
          <ColorPickerItem>
            <ColorLabel>To</ColorLabel>
            <ColorButton $color={rgbaToString(endColor)} onClick={(e) => onColorPickerOpen(e, 'demoEnd')} />
          </ColorPickerItem>
        </HorizontalColorGroup>
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Steps</ControlLabel>
        <Slider
          value={steps}
          onChange={(_, value) => handleStepsChange(value as number)}
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
          onChange={(_, value) => handlePopulationRangeChange(value as number[])}
          min={0}
          max={10000}
          step={100}
          valueLabelDisplay="auto"
        />
      </ControlGroup>
    </LayerSection>
  );
});
