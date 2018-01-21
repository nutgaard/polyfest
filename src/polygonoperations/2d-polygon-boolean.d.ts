declare module "2d-polygon-boolean" {
    type Polygon = number[][];
    type Operation = 'and' | 'or' | 'not';
    export default function polygonBoolean(subject: Polygon, clip: Polygon, operation: Operation): Polygon[];
}
