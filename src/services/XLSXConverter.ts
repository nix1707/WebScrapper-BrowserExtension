import xlsx from "json-as-xlsx";
import ParsedElement from "../models/parsedElement";

export default class XLSXConverter {
    static convertParsedData(elements: ParsedElement[]) {
        const jsonSheet = [{
            sheet: "Results",
            columns: [
                { label: "Date", value: "date" },
                { label: "Url", value: "url" },
                { label: "Result", value: "result" },
            ],
            content: [
                ...elements.map(x => {
                    return { date: x.date, url: x.urlFrom, result: x.value }
                })
            ]

        }]
        const settings = {
            fileName: "Scrapped Data",
            writeMode: "writeFile",
            writeOptions: {},
        }

        return xlsx(jsonSheet, settings)
    }
}