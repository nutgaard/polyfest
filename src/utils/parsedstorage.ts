export default interface ParsedStorage {
    clear(): void;
    get(): object | null;
    set(data: object): void;
}