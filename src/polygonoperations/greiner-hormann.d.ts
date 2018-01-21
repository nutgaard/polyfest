declare module "greiner-hormann" {
    type Polygon = number[][];

    export function intersection(subject: Polygon, clip: Polygon): Polygon[];
    export function union(subject: Polygon, clip: Polygon): Polygon[];
}
