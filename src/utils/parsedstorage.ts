export default interface ParsedStorage {
    get(): object | null;
    set(data: object): void;
}