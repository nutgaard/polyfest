import { Feature } from '../domain';

export interface PolygonOperations {
    union(feature1: Feature, feature2: Feature): Feature[];
    intersect(feature1: Feature, feature2: Feature): Feature[];
}