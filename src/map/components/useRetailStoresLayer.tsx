import { getRetailStoresSource, type RetailStoresProperties } from '@/data-source';
import { LayerTooltip } from '@/cdk/layer';
import {
  createRetailStoresVectorTileLayer,
  getTooltipLayerRetailStoresData,
  type RetailStoresLayerDefaultConfig,
} from '@/layer';
import type { PickingInfo } from '@deck.gl/core';
import { useState } from 'react';

export function useRetailStoresLayer(config: RetailStoresLayerDefaultConfig) {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<{ properties: RetailStoresProperties }>>();

  const dataSource = getRetailStoresSource();

  const layer = createRetailStoresVectorTileLayer({
    config,
    dataSource,
    onHover: setHoverInfo,
  });

  const tooltipData = getTooltipLayerRetailStoresData(hoverInfo);
  const tooltip = tooltipData ? <LayerTooltip x={tooltipData.x} y={tooltipData.y} items={tooltipData.items} /> : null;

  return { layer, tooltip, dataSource };
}
