import Backend from './backend';
import Localstorage from '../utils/localstorage';
import PolygonJsImpl from '../polygonoperations/greiner-hormann-impl';
import Filestorage from '../utils/filestorage';

export function createBrowserBackend() {
    return new Backend(new Localstorage('polyfest'), new PolygonJsImpl());
}

export function createServerBackend() {
    return new Backend(new Filestorage(), new PolygonJsImpl());
}
