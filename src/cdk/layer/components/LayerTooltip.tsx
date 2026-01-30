import { map } from 'lodash-es';
import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  background-color: #ffffff;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 12px;
  max-width: 200px;
`;

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TooltipLabel = styled.span`
  font-weight: bold;
  color: #666666;
`;

const TooltipValue = styled.span`
  color: #000000;
`;

interface LayerTooltipProps {
  x: number;
  y: number;
  items: Array<[string, string]>;
}

export function LayerTooltip({ x, y, items }: LayerTooltipProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
    left: x,
    top: y,
  };

  return (
    <TooltipContainer style={tooltipStyle}>
      {map(items, ([label, value]: [string, string], index: number) => (
        <TooltipRow key={index}>
          <TooltipLabel>{label}:</TooltipLabel>
          <TooltipValue>{value}</TooltipValue>
        </TooltipRow>
      ))}
    </TooltipContainer>
  );
}
