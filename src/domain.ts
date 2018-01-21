import * as Color from 'color';

export type Coordinate = number[];

export interface Polygon {
    type: 'Polygon';
    coordinates: Array<Coordinate[]>;
}
export type Geometry = Polygon;

export interface JsonFeature {
    type: 'Feature';
    properties: object;
    geometry: Geometry;
}
export interface Feature extends JsonFeature {
    id: string;
    isSelected: boolean;
    color: Color;
}

export interface JsonFeatureCollection {
    type: 'FeatureCollection';
    features: JsonFeature[];
}
export interface FeatureCollection extends JsonFeatureCollection {
    features: Feature[];
}

export interface SvgViewbox {
    minx: number;
    miny: number;
    width: number;
    height: number;
    svgString?: string;
}