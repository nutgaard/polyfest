import * as fetchMock from 'fetch-mock';
import { respondWith } from './utils';
import { contextroot } from './../api';
import { createBrowserBackend } from '../backend/backend-factory';
import Backend from '../backend/backend';
import { FeatureCollection } from '../domain';

const backend: Backend = createBrowserBackend();

// tslint:disable
console.log('### MOCK ENABLED ###');
(fetchMock as any)._mock();
const realFetch = (fetchMock as any).realFetch;
console.log('Contextroot;', contextroot);
// tslint:enable

type BodyParam = {
    subjectId: string;
    clipId: string;
};
type PutBodyParam = FeatureCollection;

fetchMock.post(`${contextroot}/api/polygon/union`, respondWith((url, config, params) => {
    const bodyParam: BodyParam = params.bodyParams as BodyParam;
    return backend.union(bodyParam.subjectId, bodyParam.clipId);
}));
fetchMock.post(`${contextroot}/api/polygon/intersect`, respondWith((url, config, params) => {
    const bodyParam: BodyParam = params.bodyParams as BodyParam;
    return backend.intersect(bodyParam.subjectId, bodyParam.clipId);
}));
fetchMock.get(`${contextroot}/api/polygon`, respondWith((url, config, params) => backend.get()));
fetchMock.put(`${contextroot}/api/polygon`, respondWith((url, config, params) => {
    const body: PutBodyParam = params.bodyParams as PutBodyParam;
    return backend.update(body);
}));
fetchMock.mock('*', respondWith((url, config) => realFetch.call(window, url, config)));