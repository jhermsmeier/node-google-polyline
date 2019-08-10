declare module "google-polyline" {
  function encode(points: Array<[number, number]>): string;
  function decode(polyline: string): Array<[number, number]>;
  export {encode, decode};
}

