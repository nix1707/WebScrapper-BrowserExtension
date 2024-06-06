import ParsedElement from "../../models/parsedElement";
import History from "../../services/History";
import XLSXConverter from "../../services/XLSXConverter";

const HistoryMenuItem = ({ item }: { item: ParsedElement }) => (
  <div className="card">
    <h2 style={{ color: "#373A40" }}>{item.value}</h2>
    <p style={{ fontSize: "small", wordBreak: "break-all" }}>
      Website: <a className="link">{item.urlFrom}</a>
    </p>
    <span className="meta">{item.date}</span>
  </div>
);

const HistoryMenu = () => {
  const history = History.Instance;

  const handleConvertToExcel = () => {
    XLSXConverter.convertParsedData(history.getHistory());
  };

  return (
    <div>
      <div className="scrollable-container" style={{ border: "none" }}>
        {history.getHistory().length > 0 ? (
          history.getHistory().reverse().map((item, index) => (
            <HistoryMenuItem key={index} item={item} />
          ))
        ) : (
          <div className="container">
            <h1 style={{ color: "#56aaf9", textAlign: "center" }}>
              Oops, it seems you haven't tried to find anything yet
            </h1>
          </div>
        )}
      </div>
      <div className="button-group">
        <button className="button-outlined" onClick={handleConvertToExcel}>
          Convert to Excel
        </button>
        <button onClick={() => history.clearHistory()}>Clear</button>
      </div>
    </div>
  );
};

export default HistoryMenu;
