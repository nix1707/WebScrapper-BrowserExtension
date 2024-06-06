import ParsedElement from "../models/parsedElement";

class ElementParser {

    async findElementsBySelector(selectors: string[]): Promise<ParsedElement[]> {
        selectors = selectors.filter(s => s !== "");

        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            const response = await chrome.scripting.executeScript({
                target: { tabId: tab.id! },
                func: (selectors: string[]) => {
                    let elements: ParsedElement[] = [];

                    selectors.forEach(selector => {
                        document.querySelectorAll(selector).forEach(e => {
                            const date: Date = new Date();

                            const formattedDate = date.toISOString()
                                    .slice(0, 10)
                                    .replace(/-/g, '/')
                                    .concat(' at ', date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

                            let parsedData = e ? {
                                date: formattedDate,
                                value: e.textContent || "Not Found",
                                urlFrom: window.location.href,
                            } : null;
                            if (parsedData) elements.push(parsedData);
                        });
                    })

                    return elements;
                },
                args: [selectors],
            });

            return response[0].result!;
        } catch (error) {
            console.error("Error retrieving answer:", error);
            return [];
        }
    }

    async findElementsByXpath(xpath: string[]): Promise<ParsedElement[]> {
        xpath = xpath.filter(x => x !== "");

        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            const response = await chrome.scripting.executeScript({
                target: { tabId: tab.id! },
                func: (xpath: string[]) => {
                    let queries: XPathResult[] = [];
                    let elements: ParsedElement[] = [];

                    xpath.forEach(path => {
                        let query = document.evaluate(
                            path, document, null,
                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
                        );
                        queries.push(query);
                    })

                    queries.forEach(query => {
                        for (let i = 0; i < query.snapshotLength; i++) {
                            if (query.snapshotItem(i)) {
                                const date: Date = new Date();

                                const formattedDate = date.toISOString()
                                    .slice(0, 10)
                                    .replace(/-/g, '/')
                                    .concat(' at ', date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

                                elements.push({
                                    date: formattedDate,
                                    value: query.snapshotItem(i)!.textContent || "Not Found",
                                    urlFrom: window.location.href,
                                });
                            }


                        }
                    });
                    return elements;
                },
                args: [xpath],
            });

            return response[0].result!;
        } catch (error) {
            console.error("Error retrieving answer:", error);
            return [];
        }
    }
};

var elementParser = new ElementParser();

export default elementParser;
