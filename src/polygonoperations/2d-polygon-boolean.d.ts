declare module '2d-polygon-boolean' {
    export type Coordinate = GeoJSON.Position;
    type Operation = 'and' | 'or' | 'not';
    export default function polygonBoolean(subject: Coordinate[], clip: Coordinate[], operation: Operation): Coordinate[][];
}

