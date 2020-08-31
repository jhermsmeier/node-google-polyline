export type Coord = number[][];
export type Path = Coord[];

export function encode(path: Coord): string;
export function decode(path: string): Coord[];
