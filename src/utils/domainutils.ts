import { FeatureCollection } from '../domain';

export function numberOfSelectedPolygons(featureCollection: FeatureCollection) {
    return featureCollection.features
        .filter((feature) => feature.properties && feature.properties.isSelected)
        .length;
}

export function selectedPolygonIds(featureCollection: FeatureCollection | null) {
    if (featureCollection === null) {
        return [];
    }
    return featureCollection.features
        .map((feature, index) => ({ index, isSelected: feature.properties ? feature.properties.isSelected : false }))
        .filter((feature) => feature.isSelected)
        .map((feature) => feature.index.toString(10));
}