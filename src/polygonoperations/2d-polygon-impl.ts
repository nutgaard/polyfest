import polygonBoolean, { Operation } from '2d-polygon-boolean';
import { PolygonOperations } from './polygonoperation';
import { Feature, Geometry } from '../domain';

function convertToArray(feature: Feature): number[][] {
    const geometry: Geometry | null = feature.geometry;
    if (geometry === null) {
        return [];
    }
    return geometry.coordinates[0];
}

function toFeature(poly: number[][]): Feature {
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
        const result: number[][][] = polygonBoolean(subjectArray, clipArray, operation);
        console.log('result', result); // tslint:disable-line
        return result.map((poly) => toFeature(poly));
    } catch (e) {
        return [subject, clip];
    }
}

class PolygonJsImpl implements PolygonOperations {
    union(subject: Feature, clip: Feature): Feature[] {
        return exec(subject, clip, 'or');
    }

    intersect(subject: Feature, clip: Feature): Feature[] {
        return exec(subject, clip, 'and');
    }
}

export default PolygonJsImpl;