import { JsonFeature, JsonFeatureCollection } from '../domain';
import ParsedStorage from '../utils/parsedstorage';
import { PolygonOperations } from '../polygonoperations/polygonoperation';
import initialData from './initialdata';

class Backend {
    storage: ParsedStorage;
    operations: PolygonOperations;

    constructor(storage: ParsedStorage, operations: PolygonOperations) {
        this.storage = storage;
        this.operations = operations;
    }

    getAll(): JsonFeatureCollection {
        return this.storage.get() as JsonFeatureCollection || initialData;
    }

    _exec(subjectId: string, clipId: string, operation: (subject: JsonFeature, clip: JsonFeature) => JsonFeature[]) {
        const subjectIndex: number = parseInt(subjectId, 10);
        const clipIndex: number = parseInt(clipId, 10);

        const data = this.getAll();
        const subject: JsonFeature = data.features[subjectId];
        const clip: JsonFeature = data.features[clipId];

        const unionFeature: JsonFeature[] = operation(subject, clip);

        const unchangedFeatures: JsonFeature[] = data.features
            .filter((_, index) => index !== subjectIndex && index !== clipIndex);

        const newFeatures: JsonFeature[] = unchangedFeatures.concat(unionFeature);
        const newCollection: JsonFeatureCollection = {
            ...data,
            features: newFeatures
        };

        this.storage.set(newCollection);

        return newCollection;
    }

    union(subjectId: string, clipId: string): JsonFeatureCollection {
        const operation = (subject: JsonFeature, clip: JsonFeature) => this.operations.union(subject, clip);
        return this._exec(subjectId, clipId, operation);
    }

    intersect(subjectId: string, clipId: string): JsonFeatureCollection {
        const operation = (subject: JsonFeature, clip: JsonFeature) => this.operations.intersect(subject, clip);
        return this._exec(subjectId, clipId, operation);
    }
}

export default Backend;