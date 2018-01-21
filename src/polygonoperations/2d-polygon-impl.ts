import polygonBoolean, { Operation } from '2d-polygon-boolean';
import { PolygonOperations } from './polygonoperation';
import { Geometry, JsonFeature } from '../domain';

function convertToArray(feature: JsonFeature): number[][] {
    return feature.geometry.coordinates[0];
}

function toFeature(poly: number[][]): JsonFeature {
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
        const result: number[][][] = polygonBoolean(subjectArray, clipArray, operation);
        console.log('result', result); // tslint:disable-line
        return result.map((poly) => toFeature(poly));
    } catch (e) {
        return [ subject, clip ];
    }
}

class PolygonJsImpl implements PolygonOperations {
    union(subject: JsonFeature, clip: JsonFeature): JsonFeature[] {
        return exec(subject, clip, 'or');
    }

    intersect(subject: JsonFeature, clip: JsonFeature): JsonFeature[] {
        return exec(subject, clip, 'and');
    }
}

export default PolygonJsImpl;