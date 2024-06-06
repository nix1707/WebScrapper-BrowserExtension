import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import HistoryMenu from "./components/HistoryMenu/HistoryMenu";
import ParsedElement from "./models/parsedElement";
import elementParser from "./services/ElementParser";
import { ParseMethod } from "./models/ParseMethod";
import History from "./services/History";
import Config from "./models/config";

const getFilteredOptions = (config: Config, parseMethod: ParseMethod) => {
  return config.options
    .filter(o => o.parseMethod === parseMethod)
    .map(o => o.path);
}

function App() {
  const [answers, setAnswers] = useState<ParsedElement[]>([]);
  const [elementPath, setElementPath] = useState('/html/body/div/h1');
  const [parseMethod, setParseMethod] = useState<ParseMethod>(ParseMethod.ByXpath);
  const [manualMode, setManualMode] = useState(false);

  const handleClick = async () => {
    let results: ParsedElement[] = [];

    if (manualMode === true) {
      results = parseMethod === ParseMethod.ByXpath
        ? await elementParser.findElementsByXpath([elementPath])
        : await elementParser.findElementsBySelector([elementPath])
      
    }
    else {
      const config = JSON.parse(localStorage.getItem('config')!) as Config;
      if (!config) {
        alert("Your configuration doesn't exist go to settings")
        return;
      }
      results = [
        ...await elementParser.findElementsByXpath(getFilteredOptions(config, ParseMethod.ByXpath)),
        ...await elementParser.findElementsBySelector(getFilteredOptions(config, ParseMethod.BySelector))
      ];
    }

    setAnswers(results);
    History.Instance.set(results);
  };

  const handlePathChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setElementPath(event.target.value);
  };

  return (
    <div className="main">
      <Navbar />
      <div style={{ padding: '5px 10px 10px 10px' }}>
        <Routes>
          <Route path="/" element={<Home
            setParseMethod={setParseMethod}
            handleClicked={handleClick}
            answers={answers}
            elementPath={elementPath}
            setAnswers={setAnswers}
            handlePathChanged={handlePathChange}
            manualMode={manualMode}
            setManualMode={setManualMode}
          />} />
          <Route path="/settings" element={<SettingsMenu />} />
          <Route path="/history" element={<HistoryMenu />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
