import { TrackFunction } from "./track";
import { ExposeFunction } from "./expose";


export type ComponentThis = {
  track: TrackFunction;
  expose: ExposeFunction;
}


export type SafeComponentThis = {
  track?: TrackFunction;
  expose?: ExposeFunction;
}