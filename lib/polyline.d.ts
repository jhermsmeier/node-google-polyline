export type Coord = [number, number];
export type Path = Coord[];

export function encode(path: Path): string;
export function decode(path: string): Path;
