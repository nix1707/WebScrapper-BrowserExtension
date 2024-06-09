import { ParseMethod } from "./ParseMethod";

export default interface Config {
    options: {
        parseMethod: ParseMethod;
        path: string;
        validationMsg: string;
    }[];
}

export const defaultEmptyConfig: Config = {
    options: [
        {
            parseMethod: ParseMethod.ByXpath,
            path: '/html/body/div/h1',
            validationMsg: ''
        },
        {
            parseMethod: ParseMethod.BySelector,
            path: 'body > div > h1',
            validationMsg: ''
        }
    ]
}

export const defaultOption = { 
    parseMethod: ParseMethod.ByXpath, 
    path: "/html/body/div/h1", 
    validationMsg:'' 
}