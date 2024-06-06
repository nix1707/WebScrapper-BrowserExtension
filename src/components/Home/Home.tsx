import { ParseMethod } from "../../models/ParseMethod";
import ParsedElement from "../../models/parsedElement";
import Dropdown from "../Dropdown/Dropdown";
import ResultDashboard from "../ResultDashboard/ResultDashboard";

interface Props {
  elementPath: string;
  handlePathChanged: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClicked: () => void;
  answers?: ParsedElement[];
  setAnswers: (answer: ParsedElement[]) => void;
  setParseMethod: (parseMethod: ParseMethod) => void;
  manualMode: boolean;
  setManualMode: (mode: boolean) => void;
};

const Home = ({ 
  elementPath, answers, setAnswers, 
  handlePathChanged, handleClicked, 
  setParseMethod, manualMode, setManualMode }: Props) => {
  

  return (

    <div>
      <Dropdown
        onSelected={setParseMethod}
        items={
          [
            { title: "By Xpath (Recommended)", Id: 0 },
            { title: "By Css Selector", Id: 1 }
          ]
        } />
      <div className="container">
        <div style={{ marginBottom: 4 }}>
          <input checked={manualMode} onChange={e => setManualMode(e.target.checked)} type="checkbox" />
          <label>MANUAL MODE</label>
        </div>

        {!manualMode && (
          <p style={{fontSize: 'large'}}>
            {"In manual mode you can enter your own CSS Selector or Xpath to find;"}<br></br>
            {"If this functionality is disabled, all paths will be taken from settings"}
          </p>)}
      </div>

      {manualMode && <textarea value={elementPath} onChange={handlePathChanged}></textarea>}
      {answers?.length! > 0 && <ResultDashboard answers={answers!} />}

      <div className="button-group">
        <button onClick={handleClicked}>Find</button>
        <button onClick={() => setAnswers([])} className="button-outlined">Clear</button>
      </div>
    </div>
  )
}

export default Home