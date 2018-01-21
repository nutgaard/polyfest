import * as greinerHormann from 'greiner-hormann';
import { PolygonOperations } from './polygonoperation';
import { Geometry, JsonFeature } from '../domain';
import { Operation } from '2d-polygon-boolean';

function convertToArray(feature: JsonFeature): number[][] {
    let coordinates = feature.geometry.coordinates[0];
    if (isSelfClosing(coordinates)) {
        return coordinates.slice(0, -1);
    }
    return coordinates;
}

function isSelfClosing(numbers: number[][]): boolean {
    const first = numbers[0];
    const last = numbers[numbers.length - 1];

    if (first[0] === last[0] && first[1] === last[1]) {
        return true;
    } else {
        return false;
    }
}

function toFeature(poly: number[][]): JsonFeature {
    if (!isSelfClosing(poly)) {
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

function exec(subject: JsonFeature, clip: JsonFeature, operation: Operation): JsonFeature[] {
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
    union(subject: JsonFeature, clip: JsonFeature): JsonFeature[] {
        return exec(subject, clip, 'or');
    }

    intersect(subject: JsonFeature, clip: JsonFeature): JsonFeature[] {
        return exec(subject, clip, 'and');
    }
}

export default GreinerHormannImpl;