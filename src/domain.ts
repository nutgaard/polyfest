import * as Color from 'color';

export interface FeatureProperties {
    isSelected?: boolean;
    color?: Color;
}
export type Operation = 'and' | 'or';
export type Geometry = GeoJSON.Polygon;
export type FeatureCollection = GeoJSON.FeatureCollection<Geometry, FeatureProperties>;
export type Feature = GeoJSON.Feature<Geometry, FeatureProperties>;
export type Coordinate = GeoJSON.Position;

export interface SvgViewbox {
    minx: number;
    miny: number;
    width: number;
    height: number;
    svgString?: string;
}