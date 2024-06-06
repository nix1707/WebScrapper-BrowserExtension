import { ParseMethod } from "./ParseMethod";

export default interface Config {
    options: {
        parseMethod: ParseMethod;
        path: string;
    }[];
}

export const defaultEmptyConfig: Config = {
    options: [
        {
            parseMethod: ParseMethod.ByXpath,
            path: '/html/body/div/h1'
        },
        {
            parseMethod: ParseMethod.BySelector,
            path: 'body > div > h1'
        }
    ]
}

export const defaultOption = { parseMethod: ParseMethod.ByXpath, path: "Click to Edit" }