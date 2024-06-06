import { useEffect, useState } from "react";
import Config, { defaultEmptyConfig as defaultConfig, defaultOption } from "../../models/config";
import EditableText from "./EditableComponents/EditableText";
import EditableOption from "./EditableComponents/EditableOption";


const SettingsMenu = () => {
    const [config, setConfig] = useState<Config | undefined>();

    useEffect(() => {
        const storedConfig = localStorage.getItem('config');
        if (storedConfig) {
            const parsedConfig: Config = JSON.parse(storedConfig);
            setConfig(parsedConfig);
        } else {
            setConfig(defaultConfig);
            localStorage.setItem('config', JSON.stringify(defaultConfig));
        }
    }, []);

    useEffect(() => {
        if (config) {
            localStorage.setItem('config', JSON.stringify(config));
            console.log(`config updated ${new Date().toISOString()}`);
        }
    }, [config]);

    const handleOptionDelete = (index: number) => {
        if (!config)
            return;
        const updatedOptions = config.options.filter((_, i) => i !== index);
        setConfig({ ...config, options: updatedOptions });
    }

    const handleOptionEdit = (id: number, index: number) => {
        if(!config)
            return;

        const updatedOptions = config.options.map((option, i) =>
            i === index ? { ...option, parseMethod: id } : option
        );
        setConfig({ ...config, options: updatedOptions });
    }

    const handlePathEdit = (index: number, content: string) => {
        if (!config)
            return;
        const updatedOptions = config.options.map((option, i) =>
            i === index ? { ...option, path: content } : option
        );
        setConfig({ ...config, options: updatedOptions });
    }

    const handleOptionAdd = () => {
        const updatedOptions = [...(config?.options || []), defaultOption];
        setConfig({ ...config!, options: updatedOptions });
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Your Configuration</h1>
            <div className="scrollable-container">
                {config?.options.map((o, index) => (
                    <div className="card" key={index}>
                        <div className="button-group">
                            <EditableOption
                                onEditing={(id) => {handleOptionEdit(id, index)}}  
                                defaultId={o.parseMethod} />
                            <button
                                className="delete-button-small"
                                onClick={() => handleOptionDelete(index)}
                            >
                                Delete
                            </button>
                        </div>
                        <EditableText
                            onEditing={(content) => handlePathEdit(index, content)}
                            element={o.path}
                        />
                    </div>
                ))}
            </div>
            <div className="button-group">
                <button onClick={handleOptionAdd}>
                    Add New +
                </button>
            </div>
        </div>
    );
};

export default SettingsMenu;
