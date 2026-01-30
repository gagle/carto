import type { SociodemographicsUsaProperties } from '@/data-source';
import type { PickingInfo } from '@deck.gl/core';

export function getTooltipSociodemographicsData(
  hoverInfo: PickingInfo<{ properties: SociodemographicsUsaProperties }> | undefined
): { x: number; y: number; items: Array<[string, string]> } | null {
  if (!hoverInfo || !hoverInfo.object) {
    return null;
  }

  const props = hoverInfo.object.properties;
  return {
    x: hoverInfo.x,
    y: hoverInfo.y,
    items: [['Population', props.total_pop.toLocaleString()]],
  };
}
