import { rgbaToString } from '@/utilities';
import { Button, Slider, Tooltip, Typography } from '@mui/material';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import type { RgbaColor } from 'react-colorful';
import styled from 'styled-components';
import { RETAIL_STORES_DEFAULT_CONFIG } from './retail-stores-defaults';

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

export interface RetailStoresConfig {
  strokeColor: RgbaColor;
  strokeWeight: number;
  pointRadius: number;
  startColor: RgbaColor;
  endColor: RgbaColor;
  steps: number;
  revenueRange: number[];
}

export interface RetailStoresControlsRef {
  getStrokeColor: () => RgbaColor;
  setStrokeColor: (color: RgbaColor) => void;
  getStartColor: () => RgbaColor;
  setStartColor: (color: RgbaColor) => void;
  getEndColor: () => RgbaColor;
  setEndColor: (color: RgbaColor) => void;
}

interface RetailStoresControlsProps {
  onChange: (config: RetailStoresConfig) => void;
  onColorPickerOpen: (event: React.MouseEvent<HTMLElement>, pickerId: string) => void;
}

export const RetailStoresControls = forwardRef<RetailStoresControlsRef, RetailStoresControlsProps>(
  ({ onChange, onColorPickerOpen }, ref) => {
  const [strokeColor, setStrokeColor] = useState<RgbaColor>(RETAIL_STORES_DEFAULT_CONFIG.strokeColor);
  const [strokeWeight, setStrokeWeight] = useState(RETAIL_STORES_DEFAULT_CONFIG.strokeWeight);
  const [pointRadius, setPointRadius] = useState(RETAIL_STORES_DEFAULT_CONFIG.pointRadius);
  const [startColor, setStartColor] = useState<RgbaColor>(RETAIL_STORES_DEFAULT_CONFIG.startColor);
  const [endColor, setEndColor] = useState<RgbaColor>(RETAIL_STORES_DEFAULT_CONFIG.endColor);
  const [steps, setSteps] = useState(RETAIL_STORES_DEFAULT_CONFIG.steps);
  const [revenueRange, setRevenueRange] = useState<number[]>(RETAIL_STORES_DEFAULT_CONFIG.revenueRange);

  const handleChange = (updates: Partial<RetailStoresConfig>) => {
    const newConfig = {
      strokeColor,
      strokeWeight,
      pointRadius,
      startColor,
      endColor,
      steps,
      revenueRange,
      ...updates,
    };
    onChange(newConfig);
  };

  const handleStrokeWeightChange = (value: number) => {
    setStrokeWeight(value);
    handleChange({ strokeWeight: value });
  };

  const handlePointRadiusChange = (value: number) => {
    setPointRadius(value);
    handleChange({ pointRadius: value });
  };

  const handleStepsChange = (value: number) => {
    setSteps(value);
    handleChange({ steps: value });
  };

  const handleRevenueRangeChange = (value: number[]) => {
    setRevenueRange(value);
    handleChange({ revenueRange: value });
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
      <Tooltip title="retail_stores" placement="bottom">
        <SectionTitle variant="h5">retail_stores</SectionTitle>
      </Tooltip>
      <ControlGroup>
        <ControlLabel gutterBottom>Stroke color</ControlLabel>
        <ColorButton $color={rgbaToString(strokeColor)} onClick={(e) => onColorPickerOpen(e, 'retailLine')} />
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
        <ControlLabel gutterBottom>Point radius</ControlLabel>
        <Slider
          value={pointRadius}
          onChange={(_, value) => handlePointRadiusChange(value as number)}
          min={0}
          max={20}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </ControlGroup>
      <ControlGroup>
        <ControlLabel gutterBottom>Fill color gradients</ControlLabel>
        <HorizontalColorGroup>
          <ColorPickerItem>
            <ColorLabel>From</ColorLabel>
            <ColorButton $color={rgbaToString(startColor)} onClick={(e) => onColorPickerOpen(e, 'retailStart')} />
          </ColorPickerItem>
          <ColorPickerItem>
            <ColorLabel>To</ColorLabel>
            <ColorButton $color={rgbaToString(endColor)} onClick={(e) => onColorPickerOpen(e, 'retailEnd')} />
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
        <ControlLabel gutterBottom>Revenue range</ControlLabel>
        <Slider
          value={revenueRange}
          onChange={(_, value) => handleRevenueRangeChange(value as number[])}
          min={0}
          max={5000000}
          step={100000}
          valueLabelDisplay="auto"
        />
      </ControlGroup>
    </LayerSection>
  );
});
