import { Feature, FeatureCollection } from '../domain';

export interface PolygonOperations {
    union(feature1: Feature, feature2: Feature): Feature[];
    intersect(feature1: Feature, feature2: Feature): Feature[];
}

export function executeOperation(
    featureCollection: FeatureCollection,
    subjectId: string,
    clipId: string,
    operation: (subject: Feature, clip: Feature) => Feature[]
): FeatureCollection  {
    const subjectIndex: number = parseInt(subjectId, 10);
    const clipIndex: number = parseInt(clipId, 10);

    let featureCount = featureCollection.features.length;
    if (subjectIndex < 0 || subjectIndex >= featureCount || clipIndex < 0 || clipIndex >= featureCount) {
        throw new Error('Illegal arguments');
    }

    const subject: Feature = featureCollection.features[subjectId];
    const clip: Feature = featureCollection.features[clipId];

    const unionFeature: Feature[] = operation(subject, clip);

    const unchangedFeatures: Feature[] = featureCollection.features
        .filter((_, index) => index !== subjectIndex && index !== clipIndex);

    const newFeatures: Feature[] = unchangedFeatures.concat(unionFeature);
    return {
        ...featureCollection,
        features: newFeatures
    };
}