import chroma from 'chroma-js';
import type { RgbaColor } from 'react-colorful';

export function generateColors(startColor: string, endColor: string, count: number): Array<string> {
  if (!chroma.valid(startColor) || !chroma.valid(endColor)) {
    return [];
  }
  return chroma.bezier([startColor, endColor]).scale().colors(count);
}

export function chromaToColorPickerRgba(color: chroma.Color): RgbaColor {
  const [r, g, b, a] = color.rgba();
  return { r, g, b, a };
}

export function rgbaToString(color: RgbaColor): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export function getGradientColor(
  value: number,
  colorPalette: string[],
  minValue: number,
  maxValue: number
): [number, number, number] {
  const stepIncrement = (maxValue - minValue) / colorPalette.length;
  const colorIndex = Math.min(Math.floor((value - minValue) / stepIncrement), colorPalette.length - 1);

  return chroma(colorPalette[colorIndex < 0 ? 0 : colorIndex]).rgb();
}
