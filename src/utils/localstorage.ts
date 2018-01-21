import ParsedStorage from './parsedstorage';

class Localstorage implements ParsedStorage {
    scope: string;

    constructor(scope: string) {
        this.scope = scope;
    }

    clear(): void {
        window.localStorage.removeItem(this.scope);
    }

    get(): object | null {
        const item: string | null = window.localStorage.getItem(this.scope);
        if (item === null) {
            return null;
        }
        return JSON.parse(item);
    }

    set(data: object): void {
        window.localStorage.setItem(this.scope, JSON.stringify(data));
    }
}

export default Localstorage;