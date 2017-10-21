import { IPathSegment } from '../types';
import { renderPath } from './render-path';

export function morph(leftSegments: IPathSegment[], rightSegments: IPathSegment[]): (offset: number) => string {
  const l = leftSegments.map((s: IPathSegment) => s.d);
  const r = rightSegments.map((s: IPathSegment) => s.d);

  return (offset: number) => renderPath(mixPoints(l, r, offset))
}

export function mixPoints(l: number[][], r: number[][], o: number): number[][] {
  return l.map((a: number[], h: number) => mix(a, r[h], o));
}

export function mix(a: number[], b: number[], o: number): number[] {
  // paths should be the same length
  const results: number[] = []
  for (let i = 0; i < a.length; i++) {
    results.push(a[i] + (b[i] - a[i]) * o)
  }
  return results
}
