import Backend from './backend';
import Localstorage from '../utils/localstorage';
import GreinerHormannImpl from '../polygonoperations/greiner-hormann-impl';
import Filestorage from '../utils/filestorage';

export function createBrowserBackend() {
    return new Backend(new Localstorage('polyfest'), new GreinerHormannImpl());
}

export function createServerBackend() {
    return new Backend(new Filestorage('./geojson.json'), new GreinerHormannImpl());
}
