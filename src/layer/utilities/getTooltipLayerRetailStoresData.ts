import type { RetailStoresProperties } from '@/data-source';
import type { PickingInfo } from '@deck.gl/core';

export function getTooltipLayerRetailStoresData(
  hoverInfo: PickingInfo<{ properties: RetailStoresProperties }> | undefined
): { x: number; y: number; items: Array<[string, string]> } | null {
  if (!hoverInfo || !hoverInfo.object) {
    return null;
  }

  const props = hoverInfo.object.properties;
  return {
    x: hoverInfo.x,
    y: hoverInfo.y,
    items: [
      ['Revenue', `$${props.revenue.toLocaleString()}`],
      ['Size', `${props.size_m2.toLocaleString()} m²`],
    ],
  };
}
