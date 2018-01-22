import { FeatureCollection } from './domain';

const isDev = process.env.REACT_APP_ENV === 'dev';

export const contextroot = isDev ? '' : 'http://localhost:8000/polyfest';
const headers = new Headers();
headers.set('Content-Type', 'application/json');

function isOk(response: Response) {
    if (!response.ok) {
        console.error('Fetch failed', response); // tslint:disable-line
        throw new Error('Fetch failed');
    }
    return response.json();
}

export function fetchFeatureCollection() {
    return fetch(`${contextroot}/api/polygon`)
        .then(isOk);
}

export function updateFeatureCollection(featureCollection: FeatureCollection) {
    return fetch(`${contextroot}/api/polygon`, {
        headers,
        method: 'PUT',
        body: JSON.stringify(featureCollection)
    }).then(isOk);
}

export function unionOfPolygons(subjectId: string, clipId: string) {
    return fetch(`${contextroot}/api/polygon/union`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ subjectId, clipId })
    }).then(isOk);
}

export function intersectionOfPolygons(subjectId: string, clipId: string) {
    return fetch(`${contextroot}/api/polygon/intersect`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ subjectId, clipId })
    }).then(isOk);
}