import * as greinerHormann from 'greiner-hormann';
import { PolygonOperations } from './polygonoperation';
import { Feature, Geometry } from '../domain';
import { Operation } from '2d-polygon-boolean';

function isSelfclosing(numbers: number[][]): boolean {
    const first = numbers[0];
    const last = numbers[numbers.length - 1];

    return first[0] === last[0] && first[1] === last[1];
}

function convertToArray(feature: Feature): number[][] {
    const geometry: Geometry | null = feature.geometry;
    if (geometry === null) {
        return [];
    }
    const coordinates = geometry.coordinates[0];
    if (isSelfclosing(coordinates)) {
        return coordinates.slice(0, -1);
    } else {
        return coordinates;
    }
}

function toFeature(poly: number[][]): Feature {
    if (!isSelfclosing(poly)) {
        poly.push(poly[0]);
    }

    const geometry: Geometry = {
        type: 'Polygon',
        coordinates: [poly]
    };

    return {
        type: 'Feature',
        properties: {},
        geometry
    };
}

function exec(subject: Feature, clip: Feature, operation: Operation): Feature[] {
    try {
        const subjectArray = convertToArray(subject);
        const clipArray = convertToArray(clip);
        let result;
        if (operation === 'or') {
            result = greinerHormann.union(subjectArray, clipArray);
        } else if (operation === 'and') {
            result = greinerHormann.intersection(subjectArray, clipArray);
        } else {
            throw new Error('unknown operation');
        }

        return result.map((poly) => toFeature(poly));
    } catch (e) {
        return [subject, clip];
    }
}

class GreinerHormannImpl implements PolygonOperations {
    union(subject: Feature, clip: Feature): Feature[] {
        return exec(subject, clip, 'or');
    }

    intersect(subject: Feature, clip: Feature): Feature[] {
        return exec(subject, clip, 'and');
    }
}

export default GreinerHormannImpl;