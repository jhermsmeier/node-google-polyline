import { expectType } from "tsd";
import { encode, decode, Path } from "./lib/polyline";

const encodedPolyline = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";
const decodedPolyline: [number, number][] = [
  [38.5, -120.2],
  [40.7, -120.95],
  [43.252, -126.453],
];

expectType<Path>(decode(encodedPolyline));
expectType<string>(encode(decodedPolyline));
