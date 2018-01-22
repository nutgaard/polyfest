import { Feature, FeatureCollection } from '../domain';
import ParsedStorage from '../utils/parsedstorage';
import { executeOperation, PolygonOperations } from '../polygonoperations/polygonoperation';
import initialData from './initialdata';

class Backend {
    storage: ParsedStorage;
    operations: PolygonOperations;

    constructor(storage: ParsedStorage, operations: PolygonOperations) {
        this.storage = storage;
        this.operations = operations;
    }

    update(featureCollection: FeatureCollection) {
        this.storage.set(featureCollection);
        return this.get();
    }

    get(): FeatureCollection {
        return this.storage.get() as FeatureCollection || initialData;
    }

    union(subjectId: string, clipId: string): FeatureCollection {
        const operation = (subject: Feature, clip: Feature) => this.operations.union(subject, clip);
        const featureCollection: FeatureCollection | Error = executeOperation(this.get(), subjectId, clipId, operation);
        this.storage.set(featureCollection);
        return featureCollection;
    }

    intersect(subjectId: string, clipId: string): FeatureCollection {
        const operation = (subject: Feature, clip: Feature) => this.operations.intersect(subject, clip);
        const featureCollection: FeatureCollection = executeOperation(this.get(), subjectId, clipId, operation);
        this.storage.set(featureCollection);
        return featureCollection;
    }
}

export default Backend;