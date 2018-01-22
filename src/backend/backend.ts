import { Feature, FeatureCollection } from '../domain';
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

    getAll(): FeatureCollection {
        return this.storage.get() as FeatureCollection || initialData;
    }

    _exec(subjectId: string, clipId: string, operation: (subject: Feature, clip: Feature) => Feature[]) {
        const subjectIndex: number = parseInt(subjectId, 10);
        const clipIndex: number = parseInt(clipId, 10);

        const data = this.getAll();
        const subject: Feature = data.features[subjectId];
        const clip: Feature = data.features[clipId];

        const unionFeature: Feature[] = operation(subject, clip);

        const unchangedFeatures: Feature[] = data.features
            .filter((_, index) => index !== subjectIndex && index !== clipIndex);

        const newFeatures: Feature[] = unchangedFeatures.concat(unionFeature);
        const newCollection: FeatureCollection = {
            ...data,
            features: newFeatures
        };

        this.storage.set(newCollection);

        return newCollection;
    }

    union(subjectId: string, clipId: string): FeatureCollection {
        const operation = (subject: Feature, clip: Feature) => this.operations.union(subject, clip);
        return this._exec(subjectId, clipId, operation);
    }

    intersect(subjectId: string, clipId: string): FeatureCollection {
        const operation = (subject: Feature, clip: Feature) => this.operations.intersect(subject, clip);
        return this._exec(subjectId, clipId, operation);
    }
}

export default Backend;