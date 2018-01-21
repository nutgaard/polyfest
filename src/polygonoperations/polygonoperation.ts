import { JsonFeature } from '../domain';

export interface PolygonOperations {
    union(feature1: JsonFeature, feature2: JsonFeature): JsonFeature[];
    intersect(feature1: JsonFeature, feature2: JsonFeature): JsonFeature[];
}