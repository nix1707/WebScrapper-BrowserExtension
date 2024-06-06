import ParsedElement from "../../models/parsedElement"
import XLSXConverter from "../../services/XLSXConverter";

interface Props{
    answers: ParsedElement[];
}

const ResultDashboard = ({answers} : Props) => {
    return answers.length > 0 ? (
        
        <div className='card' style={{ maxHeight: '120px !important' }}>
            <h2 style={{ textAlign: "center", color: "#56aaf9" }}>
                Catch your answers!
            </h2>
            <div className="scrollable-container" style={{ maxHeight: '100px !important' }}>
                {answers.map(a => (
                    <p style={{ fontSize: 'medium', fontWeight: 'bold', color: "#373A40" }}>
                        {a.value}
                    </p>))}
            </div>
            <button 
                style={{padding: '6px 12px'}} 
                onClick={() => XLSXConverter.convertParsedData(answers)}>
                    Convert to Excel
            </button>
        </div>
    ) : (
        <div className="card">
            <h1>Unfortunately, we haven't found anything you're looking for!</h1>
        </div>
    )
}

export default ResultDashboard