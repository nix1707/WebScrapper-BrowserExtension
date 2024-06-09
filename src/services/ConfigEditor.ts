import Config, { defaultEmptyConfig as defaultConfig, defaultOption } from "../models/config";
import SelectorValidator from "./validators/SelectorValidator";

class OptionEditor {
    config: Config;

    constructor(config?: Config) {
        if (config) {
            this.config = config;
        } else {
            this.config = defaultConfig;
        }
    }

    get Config() {
        return this.config;
    }

    handleOptionDelete(index: number) {
        const updatedOptions = this.config.options.filter((_, i) => i !== index);
        this.config = { ...this.config, options: updatedOptions };
    }

    handleOptionMethodEdit(id: number, index: number) {
        const updatedOptions = this.config.options.map((option, i) =>
            i === index ? { ...option, parseMethod: id } : option);

        const optionToValid = updatedOptions[index];
        const { msg } = SelectorValidator.isValidPath(optionToValid.path, id);

        updatedOptions[index] = { ...optionToValid, validationMsg: msg };
        this.config = { ...this.config, options: updatedOptions };
    }

    handlePathEdit(index: number, content: string) {
        const option = this.config.options[index];
        const { msg } = SelectorValidator.isValidPath(content, option.parseMethod);

        option.validationMsg = msg;

        const updatedOptions = this.config.options.map((option, i) =>
            i === index ? { ...option, path: content } : option);
        this.config = { ...this.config, options: updatedOptions };
    }

    handleOptionAdd() {
        const updatedOptions = [...this.config.options, defaultOption];
        this.config = { ...this.config, options: updatedOptions };
    }
}

export default OptionEditor;
