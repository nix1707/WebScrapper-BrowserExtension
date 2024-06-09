import moment from "moment";
import ParsedElement from "../models/parsedElement";

class ElementParser {
    private async getCurrentTarget(){
        let[tab] = await chrome.tabs.query({active: true, currentWindow: true});
        return { tabId: tab.id! }
    }

    async findElementsBySelector(selectors: string[]): Promise<ParsedElement[]> {
        selectors = [...new Set(selectors)]
            .filter(s => s !== "")
            .map(s => s.replace(/:nth-child\(\d+\)/g, ''));;

        const response = await chrome.scripting.executeScript({
            target: await this.getCurrentTarget(),

            func: (selectors: string[], date: string) => {
                let elements: ParsedElement[] = [];

                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(e => {
                        let parsedData = e ? {
                            date: date,
                            value: e.textContent || "Unknown Content",
                            urlFrom: window.location.href,
                        } : null;
                        if (parsedData) elements.push(parsedData);
                    });
                    
                })

                return [...new Set(elements)];
            },
            args: [selectors, moment().format("DD/MM/YYYY [at] hh:MM")],
        }).catch(r => { console.log(r); return [] });

        return response[0].result!;
    }

    async findElementsByXpath(xpath: string[]): Promise<ParsedElement[]> {
        xpath = [...new Set(xpath)]
            .filter(x => x !== "");

        const response = await chrome.scripting.executeScript({
            target: await this.getCurrentTarget(),
            func: (xpath: string[], date: string) => {
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
                        if (!query.snapshotItem(i))
                            continue;
                        elements.push({
                            date: date,
                            value: query.snapshotItem(i)!.textContent || "Unknown Content",
                            urlFrom: window.location.href,
                        });
                    }
                });
                return [...new Set(elements)];
            },
            args: [xpath, moment().format("DD/MM/YYYY [at] hh:MM")],
        }).catch(r => { console.log(r); return [] });

        return response[0].result!;
    }
};

var elementParser = new ElementParser();

export default elementParser;
