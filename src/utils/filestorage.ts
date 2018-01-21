import ParsedStorage from './parsedstorage';

class Filestorage implements ParsedStorage {
    clear(): void {
        console.log('clear'); // tslint:disable-line
    }

    get(): object | null {
        return null;
    }

    set(data: object): void {
        console.log('set'); // tslint:disable-line
    }
}

export default Filestorage;