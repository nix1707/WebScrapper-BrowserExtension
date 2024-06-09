import { ParseMethod } from "../../models/ParseMethod";

class SelectorValidator {
    private static cssPattern = /^[a-zA-Z0-9\s>~+.#:[\]=^$*'"()-]*$/;
    private static xpathPattern = /^(\/{1,2}[\w-]+(?:\[\w+(?:[=><!]+['"].+?['"])?\])?)*(\/?)$/;

    static isValidPath(path: string, parseMethod: ParseMethod) {
        if (parseMethod === ParseMethod.ByXpath)
            return this.isValidXpath(path);

        else if(parseMethod === ParseMethod.BySelector)
            return this.isValidCSSSelector(path);

        return {result: false, msg: 'Invalid Path'};
    }

    static isValidXpath(xpath: string) {
        const valid = this.xpathPattern.test(xpath);
        return { result: valid, msg: valid ? '' : 'Invalid XPath' }
    }

    static isValidCSSSelector(selector: string) {
        const valid = this.cssPattern.test(selector);
        return { result: valid, msg: valid ? '' : 'Invalid Css Selector' }
    }
}

export default SelectorValidator;