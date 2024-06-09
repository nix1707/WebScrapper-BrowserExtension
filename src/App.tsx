import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ParsedElement from "./models/parsedElement";
import elementParser from "./services/ElementParser";
import { ParseMethod } from "./models/ParseMethod";
import History from "./services/History";
import Config from "./models/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import HistoryMenu from "./components/HistoryMenu/HistoryMenu";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";


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
              parseMethod={parseMethod}
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
      <footer>
        <label>Made with <FontAwesomeIcon icon={faHeart} /> by Voxy</label>
        <a
          onClick={() => chrome.tabs.create({ url: "https://github.com/nix1707" })}>
          <FontAwesomeIcon style={{ width: 25, height: 25 }} href="" icon={faGithub} />
        </a>
      </footer>
    </div>
  );
}

export default App;
