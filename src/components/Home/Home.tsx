import { faEraser, faMagnifyingGlass, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ParseMethod } from "../../models/ParseMethod";
import ParsedElement from "../../models/parsedElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Dropdown/Dropdown";
import ResultDashboard from "../ResultDashboard/ResultDashboard";
import { useEffect, useState } from "react";
import SelectorValidator from "../../services/validators/SelectorValidator";

interface Props {
  elementPath: string;
  setElementPath: (path: string) => void;
  handlePathChanged: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClicked: () => void;
  answers?: ParsedElement[];
  setAnswers: (answer: ParsedElement[]) => void;
  parseMethod: ParseMethod;
  setParseMethod: (parseMethod: ParseMethod) => void;
  manualMode: boolean;
  setManualMode: (mode: boolean) => void;
};

const Home = ({
  elementPath, answers,
  handlePathChanged, handleClicked,
  setParseMethod, parseMethod, manualMode,
  setManualMode, setAnswers, setElementPath }: Props) => {

  const [isValid, setIsValid] =
    useState<{ result: boolean, msg: string }>({ result: true, msg: '' })

  useEffect(() => {
    if (manualMode) {
      setIsValid(SelectorValidator.isValidPath(elementPath, parseMethod))
    }
  }, [elementPath, parseMethod, manualMode])

  return (

    answers === undefined || answers.length > 0 === false ? (<div>
      {manualMode && <Dropdown
        onSelected={setParseMethod}
        items={
          [
            { title: "By Xpath (precise)", Id: 0 },
            { title: "By Selector (all-out)", Id: 1 }
          ]
        } />}
      <div className="container">
        <div style={{ marginBottom: 4 }}>
          <input checked={manualMode} onChange={e => setManualMode(e.target.checked)} type="checkbox" />
          <label>MANUAL MODE</label>
        </div>

        {!manualMode && (
          <p style={{ fontSize: 'large' }}>
            {"In manual mode you can enter your own CSS Selector or Xpath to find;"}
            <br /><br />
            {"If this functionality is disabled, all paths will be taken from settings"}
          </p>)}
      </div>

      {manualMode && (
        <>
          <textarea
            value={elementPath}
            onChange={handlePathChanged}
            style={{ borderColor: isValid ? '#4ca0dc' : 'red' }}
          />
          {!isValid?.result &&
            <div className="error-message">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              {isValid.msg}
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>}
        </>
      )}

      {isValid.result &&
        <div className="button-group">
          <button onClick={handleClicked}>
            {"Find "}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {manualMode &&
            elementPath &&
            <button className="button-outlined" onClick={() => setElementPath("")}>
              {"Clear "}
              <FontAwesomeIcon icon={faEraser} />
            </button>
          }
        </div>}

    </div>) : (
      <ResultDashboard setAnswers={setAnswers} answers={answers} />
    )
  )

}

export default Home