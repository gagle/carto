import { type RetailStoresProperties } from '@/data-source';
import { LayerTooltip } from '@/cdk/layer';
import { createRetailStoresVectorTileLayer, getTooltipLayerRetailStoresData, type RetailStoresConfig } from '@/layer';
import type { PickingInfo } from '@deck.gl/core';
import { useState } from 'react';

export function useRetailStoresLayer(config: RetailStoresConfig) {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<{ properties: RetailStoresProperties }>>();

  const layer = createRetailStoresVectorTileLayer({
    config,
    onHover: setHoverInfo,
  });

  const tooltipData = getTooltipLayerRetailStoresData(hoverInfo);
  const tooltip = tooltipData ? <LayerTooltip x={tooltipData.x} y={tooltipData.y} items={tooltipData.items} /> : null;

  return { layer, tooltip };
}
