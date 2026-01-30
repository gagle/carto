import { type SociodemographicsUsaProperties } from '@/data-source';
import { LayerTooltip } from '@/cdk/layer';
import {
  createSociodemographicsVectorTileLayer,
  getTooltipLayerSociodemographicsData,
  type SociodemographicsConfig,
} from '@/layer';
import type { PickingInfo } from '@deck.gl/core';
import { useState } from 'react';

export function useSociodemographicsLayer(config: SociodemographicsConfig) {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<{ properties: SociodemographicsUsaProperties }>>();

  const layer = createSociodemographicsVectorTileLayer({
    config,
    onHover: setHoverInfo,
  });

  const tooltipData = getTooltipLayerSociodemographicsData(hoverInfo);
  const tooltip = tooltipData ? <LayerTooltip x={tooltipData.x} y={tooltipData.y} items={tooltipData.items} /> : null;

  return { layer, tooltip };
}
