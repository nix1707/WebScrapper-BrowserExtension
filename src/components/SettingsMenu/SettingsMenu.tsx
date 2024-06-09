import { useEffect, useState } from "react";
import Config from "../../models/config";
import EditableText from "./EditableComponents/EditableText";
import EditableOption from "./EditableComponents/EditableOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faPlus, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import OptionEditor from "../../services/ConfigEditor";


const SettingsMenu = () => {
    const [optionEditor, setOptionEditor] = useState<OptionEditor | undefined>();

    useEffect(() => {
        const storedConfig = localStorage.getItem('config');
        if (storedConfig) {
            const parsedConfig: Config = JSON.parse(storedConfig);
            setOptionEditor(new OptionEditor(parsedConfig));
        } else {
            setOptionEditor(new OptionEditor());
            localStorage.setItem('config', JSON.stringify(new OptionEditor().Config));
        }
    }, []);

    useEffect(() => {
        if (optionEditor) {
            localStorage.setItem('config', JSON.stringify(optionEditor.Config));
            console.log(`config updated ${new Date().toISOString()}`);
        }
    }, [optionEditor]);

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#524C42', padding: 3, userSelect: 'none' }}>
                Your Configuration
                <FontAwesomeIcon icon={faGears} />
            </h1>
            <div className="scrollable-container">
                {optionEditor?.config?.options.map((o, index) => (
                    <div className="card" key={index}>
                        <div className="button-group">
                            <EditableOption
                                onEditing={(id) => {
                                    optionEditor?.handleOptionMethodEdit(id, index);
                                    setOptionEditor(new OptionEditor(optionEditor?.Config));
                                }}
                                defaultId={o.parseMethod} />
                            <button
                                className="delete-button-small"
                                onClick={() => {
                                    const newOptionEditor = new OptionEditor(optionEditor?.Config);
                                    newOptionEditor?.handleOptionDelete(index);
                                    setOptionEditor(newOptionEditor);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        <EditableText
                            onEditing={(content) => {
                                optionEditor?.handlePathEdit(index, content);
                                setOptionEditor(new OptionEditor(optionEditor?.Config));
                            }}
                            element={o.path}
                        />
                        {o.validationMsg && (
                            <div className="error-message">
                                <FontAwesomeIcon icon={faTriangleExclamation}/>
                                {o.validationMsg}
                                <FontAwesomeIcon icon={faTriangleExclamation}/>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="button-group">
                <button onClick={() => {
                    optionEditor?.handleOptionAdd();
                    setOptionEditor(new OptionEditor(optionEditor?.Config));
                }}>
                    {"Add "}
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default SettingsMenu;
