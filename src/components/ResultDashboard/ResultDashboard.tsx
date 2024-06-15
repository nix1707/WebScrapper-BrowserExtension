import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParsedElement from "../../models/parsedElement"
import XLSXConverter from "../../services/XLSXConverter";
import { faCircleCheck, faCopy, faEraser, faTable } from "@fortawesome/free-solid-svg-icons";

interface Props {
    answers: ParsedElement[];
    setAnswers: (answers: ParsedElement[]) => void;
}

const ResultDashboard = ({ answers, setAnswers }: Props) => {
    const handleConvertToExcel = () => {
        if(answers.length > 0)
            XLSXConverter.convertParsedData(answers)
    }
    return answers.length > 0 ? (

        <div className='card' style={{ maxHeight: '120px !important' }}>
            <h2 style={{ textAlign: "center", color: "#56aaf9" }}>
                Catch your answers!
            </h2>
            <div className="scrollable-container" style={{ maxHeight: '100px !important' }}>
                {answers.map(a => (
                    <p style={{
                        marginBottom: 10, 
                        fontSize: 'medium', 
                        fontWeight: 'bold', 
                        color: "#373A40", 
                        wordBreak: 'break-all'
                    }}>
                        <FontAwesomeIcon icon={faCircleCheck} /> {" " + a.value}
                    </p>))}
            </div>
            <div className="button-group">
                <button 
                    style={{ padding: '6px 12px' }}
                    onClick={() => {
                        var text = answers.map(a => a.value).join("\n");
                        navigator.clipboard.writeText(text)
                    }}>
                    Copy <FontAwesomeIcon icon={faCopy}/>
                </button>
                <button
                    style={{ padding: '6px 12px' }}
                    onClick={handleConvertToExcel}>
                    Excel <FontAwesomeIcon icon={faTable} />
                </button>
                <button 
                    style={{ padding: '6px 12px' }} 
                    onClick={() => setAnswers([])} 
                    className="button-outlined">{"Clear "} 
                    <FontAwesomeIcon icon={faEraser} />
                </button>
            </div>
        </div>
    ) : (
        <div className="card">
            <h1>Unfortunately, we haven't found anything you're looking for!</h1>
        </div>
    )
}

export default ResultDashboard