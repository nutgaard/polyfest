import * as fs from 'fs';
import ParsedStorage from './parsedstorage';

class Filestorage implements ParsedStorage {
    file: string;

    constructor(file: string) {
        this.file = file;

    }
    get(): object | null {
        if (!fs.existsSync(this.file)) {
            return null;
        }

        const content: string = fs.readFileSync(this.file, 'utf-8');
        return JSON.parse(content);
    }

    set(data: object): void {
        const content: string = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.file, content, 'utf-8');
    }
}

export default Filestorage;