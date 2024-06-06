import ParsedElement from "../models/parsedElement";

class History {

    private static instance: History;
    private readonly localStorageKey = "history";

    private constructor() {}

    static get Instance(): History {
        if (!History.instance) {
            History.instance = new History();
        }
        return History.instance;
    }

    set(items: ParsedElement[]): void {
        const history = this.getHistory();
        history.push(...items);
        localStorage.setItem(this.localStorageKey, JSON.stringify(history));
    }

    remove(item: ParsedElement): void{
        let history = this.getHistory();
        history = history.filter(i => i !== item);
        localStorage.setItem(this.localStorageKey, JSON.stringify(history));
    }

    getHistory(): ParsedElement[] {
        const historyJson = localStorage.getItem(this.localStorageKey);
        return historyJson ? JSON.parse(historyJson) : [];
    }

    clearHistory(): void {
        localStorage.removeItem(this.localStorageKey);
    }
}

export default History;