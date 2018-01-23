import { Coordinate } from '../domain';

declare module 'greiner-hormann' {
    export function intersection(subject: Coordinate[], clip: Coordinate[]): Coordinate[][];
    export function union(subject: Coordinate[], clip: Coordinate[]): Coordinate[][];
}
